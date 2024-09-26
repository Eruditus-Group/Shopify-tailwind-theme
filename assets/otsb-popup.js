if (!window?.otsb?.loadedScript) {
  window.otsb = {
    ...(window.otsb || {}),
    loadedScript: [],
  };
}
if (!window.otsb.loadedScript.includes('otsb-popup.js')) {
  window.otsb.loadedScript.push('otsb-popup.js');

  requestAnimationFrame(() => {
    document.addEventListener('alpine:init', () => {
      Alpine.data('otsb_xPopups', (data) => ({
        enable: false,
        showMinimal: false,
        show: Shopify.designMode
          ? localStorage.getItem(data.name + '-' + data.sectionId)
            ? xParseJSONOTSB(localStorage.getItem(data.name + '-' + data.sectionId))
            : true
          : false,
        delayDays: data.delayDays ? data.delayDays : 0,
        t: '',
        copySuccess: false,
        loading: false,
        spin: false,
        isMobileScreen: window.innerWidth < 768,
        isTouchDevice: 'ontouchstart' in window || navigator.msMaxTouchPoints,
        hasCompletedSubscribe: () => {
          let intentCompleted = localStorage.getItem(`intent-${data.sectionId}_completed`);
          if (typeof intentCompleted === 'string') {
            // cast to boolean
            intentCompleted = intentCompleted === 'true';
          }
          return intentCompleted === true;
        },
        init() {
          if (Shopify.designMode) {
            var _this = this;
            _this.open();
            const handlePopupSelect = (event, isResize = null) => {
              if ((event.detail && event.detail.sectionId.includes(data.sectionId)) || isResize) {
                if (window.Alpine) {
                  _this.open();
                  localStorage.setItem(data.name + '-' + data.sectionId, JSON.stringify(true));
                } else {
                  document.addEventListener('alpine:initialized', () => {
                    _this.open();
                    localStorage.setItem(data.name + '-' + data.sectionId, JSON.stringify(true));
                  });
                }
              } else {
                if (window.Alpine) {
                  _this.closeSection();
                  localStorage.setItem(data.name + '-' + data.sectionId, JSON.stringify(false));
                } else {
                  document.addEventListener('alpine:initialized', () => {
                    _this.closeSection();
                    localStorage.setItem(data.name + '-' + data.sectionId, JSON.stringify(false));
                  });
                }
              }
            };

            document.addEventListener('shopify:section:select', (event) => {
              handlePopupSelect(event);
            });

            document.addEventListener('shopify:block:select', (event) => {
              handlePopupSelect(event);
            });
          }

          const _that = this;
          if (data.enable_exit_intent && !Shopify.designMode && data.email_form_success === false) {
            // check if is mobile or tablet (is touch device)
            if (_that.isTouchDevice || _that.isMobileScreen) {
              // listen on back button
            } else {
              const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
              const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
              // check if is firefox or safari and document.documentElement has addEventListener method
              // so listen for mouseout event
              if ((isFirefox || isSafari) && document.documentElement && typeof document.documentElement.addEventListener === 'function') {
                document.documentElement.addEventListener('mouseout', (event) => {
                  // 
                  if (event.clientY <= 0 && _that.show === false) { // If mouse moves within 50px of the top of the window
                    _that.open();
                  }
                  
                });
              } else {
                document.addEventListener("mousemove", function(event) {
                  if (event.clientY < 20 && _that.show === false) { // If mouse moves within 50px of the top of the window
                    _that.open();
                  }
                });
                document.addEventListener('mouseleave', (event) => {
                  if (event.clientY <= 0 && _that.show === false) {
                    _that.open();
                  }
                });
              }
            }
          }
          // listen on submit form#newsletter-data.sectionId
          const formElement = this.$el.querySelector('form#newsletter-' + data.sectionId);
          if (formElement && !Shopify.designMode) {
            formElement.addEventListener('submit', () => {
              _that.loading = true;
              localStorage.setItem(`intent-${data.sectionId}_completed`, false);
            });
          }

          const thankiuPageSelector = '.otsb-popup__thankiu-' + data.sectionId;
          const backupThankiuPageSelector = '#Newsletter-success--' + data.sectionId;
          if (this.$el.querySelector(thankiuPageSelector) || this.$el.querySelector(backupThankiuPageSelector)) {
            if (this.hasCompletedSubscribe() === false) {
              this.open();
            }
          }
        },
        load() {
          //optimize popup load js
          if (window.location.pathname === '/challenge') return;

          const _this = this;
          if (Shopify.designMode) {
            _this.open();
          } else {
            // check if popup is intent or not
            if (data.enable_exit_intent) {
              // check if is mobile or tablet (is touch device) and show on mobile is true
              // if all conditions are true, apply normal popup
              if (!_this.isMobileScreen && !_this.isTouchDevice) return;
              if (!data.showOnMobile) return;
            }
            try {
              if (data.name == 'popup-promotion' && !_this.handleSchedule() && data.showCountdown) {
                return;
              }
              
              if (_this.hasCompletedSubscribe() === false) {
                setTimeout(() => {
                  _this.open();
                }, data.delays * 1000);
              }
              if (data.name === 'popup-spin-wheel') {
                setTimeout(() => {
                  _this.open();
                }, data.delays * 1000);
              }
            } catch (error) {
              console.log(error);
            }
          }
        },
        open() {
          if (data.name == 'popup-spin-wheel' && localStorage.getItem('result-' + data.sectionId)) {
            this.show = true;
            this.setOverlay();
            return;
          }
          if (data.enable_exit_intent) {
            // show popup if is desktop and not touch device
            if (!this.isMobileScreen && !this.isTouchDevice) {
              this.show = true;
              return;
            }
            // if is mobile or tablet (is touch device) and show on mobile is true, use normal popup logic
            if (!data.showOnMobile) return;

            if (data.email_form_success) {
              this.show = true;
              return;
            }
          }
          if (!Shopify.designMode && this.isExpireSave() && !this.show) return;

          var _this = this;

          //Show minimal when
          // 1. enable show minimal on desktop + default style = minimal + window width >= 768
          // 2. enable show minimal on mobile + default style mobile = minimal + window width < 768
          if (
            (data.showMinimal && data.default_style == 'minimal' && window.innerWidth >= 768) ||
            (data.showMinimalMobile && data.default_style_mobile == 'minimal' && window.innerWidth < 768)
          ) {
            _this.showMinimal = true;
            _this.show = false;
            if (Shopify.designMode) {
              localStorage.setItem(data.name + '-' + data.sectionId, JSON.stringify(false));
              _this.removeOverlay();
            }
          } else {
            //Show full popup
            if ((data.showOnMobile && window.innerWidth < 768) || window.innerWidth >= 768) {
              //Show a full popup for the first time accessing the site; if the customer closes the full popup, display a minimal popup during the session
              if (localStorage.getItem('current-' + data.sectionId) == 'minimal') {
                _this.showMinimal = true;
                _this.show = false;
                _this.removeOverlay();
              } else {
                _this.show = true;
                _this.showMinimal = false;
                _this.setOverlay();
                if (!Shopify.designMode) {
                  _this.saveDisplayedPopup();
                }
              }
            } else {
              //Show nothing when screen < 768 and disable show popup on mobile
              _this.removeOverlay();
            }
          }
        },
        close() {
          if (data.enable_exit_intent) {
            this.show = false;
            if (data.email_form_success) {
              localStorage.setItem(`intent-${data.sectionId}_completed`, true);
            }
            return;
          }
          var _this = this;
          if (Shopify.designMode) {
            requestAnimationFrame(() => {
              setTimeout(() => {
                _this.showMinimal = true;
              }, 300);
            });
          } else {
            this.removeDisplayedPopup();
            if (
              ((data.showMinimal && window.innerWidth >= 768) || (data.showMinimalMobile && window.innerWidth < 768)) &&
              !this.spin
            ) {
              requestAnimationFrame(() => {
                setTimeout(() => {
                  _this.showMinimal = true;
                }, 300);
                //Save storage data when closing the full popup (the full popup only shows for the first time accessing the site).
                localStorage.setItem('current-' + data.sectionId, 'minimal');
              });
            } else {
              if (!this.isExpireSave()) {
                this.setExpire();
              }
            }
          }
          requestAnimationFrame(() => {
            setTimeout(() => {
              _this.show = false;
              _this.removeOverlay();
            }, 300);
          });
        },
        closeSection() {
          this.show = false;
          this.showMinimal = false;
          this.removeOverlay();
        },
        setExpire() {
          const item = {
            section: data.sectionId,
            expires: Date.now() + this.delayDays * 24 * 60 * 60 * 1000,
          };

          localStorage.setItem(data.sectionId, JSON.stringify(item));
          //remove storage data, the full popup will be displayed when the site applies the reappear rule.
          localStorage.removeItem('current-' + data.sectionId);
        },
        isExpireSave() {
          const item = xParseJSONOTSB(localStorage.getItem(data.sectionId));
          if (item == null) return false;

          if (Date.now() > item.expires && data.delayDays !== 0) {
            localStorage.removeItem(data.sectionId);
            return false;
          }

          return true;
        },
        handleSchedule() {
          if (data.showCountdown) {
            let el = document.getElementById('x-promotion-' + data.sectionId);
            let settings = xParseJSONOTSB(el.getAttribute('x-countdown-data'));
            if (!Alpine.store('xHelper').canShow(settings)) {
              if (!Shopify.designMode && data.schedule_enabled) {
                requestAnimationFrame(() => {
                  this.show = false;
                });

                return false;
              }
            }
          }

          this.enable = true;
          return true;
        },
        clickMinimal() {
          requestAnimationFrame(() => {
            this.show = true;
            this.showMinimal = false;
            if (!Shopify.designMode) {
              this.saveDisplayedPopup();
            }
            this.setOverlay();
          });
        },
        setOverlay() {
          let popupsDiv = document.querySelector('#otsb-popup-exit-intent');
          if (popupsDiv.classList.contains('bg-[#acacac]')) return;
          if (data.overlay) {
            popupsDiv.className += ' bg-[#acacac] bg-opacity-30';
          }
        },
        removeOverlay() {
          let popupsDiv = document.querySelector('#otsb-popup-exit-intent');
          if (data.name === 'popup-spin-wheel') {
            popupsDiv.classList.remove('bg-[#acacac]', 'bg-opacity-30');
          }
          displayedPopups = xParseJSONOTSB(localStorage.getItem('promotion-popup')) || [];
          if (popupsDiv.classList.contains('bg-[#acacac]') && displayedPopups.length == 0) {
            popupsDiv.classList.remove('bg-[#acacac]', 'bg-opacity-30');
          }
        },
        //close minimal popup will set expired
        closeMinimal() {
          this.showMinimal = false;
          if (Shopify.designMode) return;

          if (!this.isExpireSave()) this.setExpire();
        },
        saveDisplayedPopup() {
          let localStorageArray = xParseJSONOTSB(localStorage.getItem('promotion-popup')) || [];
          if (!localStorageArray.some((item) => item == data.name + '-' + data.sectionId)) {
            localStorageArray.push(data.name + '-' + data.sectionId);
            localStorage.setItem('promotion-popup', JSON.stringify(localStorageArray));
          }
        },
        removeDisplayedPopup() {
          let localStorageArray = xParseJSONOTSB(localStorage.getItem('promotion-popup')),
            updatedArray = localStorageArray.filter((item) => item != data.name + '-' + data.sectionId);
          localStorage.setItem('promotion-popup', JSON.stringify(updatedArray));
        },
        setSpin() {
          this.spin = true;
        },
      }));
      Alpine.data('otsb_xPopupsSpin', (data) => ({
        init() {
          const jsonString = data.data_wheel.replace(/'/g, '"');

          // Parse the JSON string
          const item = JSON.parse(jsonString);
          document.addEventListener('shopify:block:load', function () {
            if (document.getElementById('chart').innerHTML.trim() === '') {
              creatSvg();
            }
          });
          if (document.getElementById('chart').innerHTML.trim() === '') {
            creatSvg();
          }
          if (localStorage.getItem('result-' + data.sectionId)) {
            var result = JSON.parse(localStorage.getItem('result-' + data.sectionId));
            showSuccess(result.picked);
          }

          function showSuccess(picked) {
            var wheel = document.getElementById('otsb-wheel-' + data.sectionId),
              success = document.getElementById('otsb-wheel-success-' + data.sectionId),
              heading = document.getElementById('otsb-success-heading-' + data.sectionId),
              subheading = document.getElementById('otsb-success-subheading-' + data.sectionId),
              code = document.getElementById('otsb-success-code-' + data.sectionId),
              result = item.filter(a => a.id === picked)[0]
              if (Shopify.designMode) {
                heading.innerHTML = ''
                subheading.innerHTML = ''
                code.innerHTML = ''
              }  
            if(result) {
              if (heading.innerHTML.trim() === '') {
                heading.append(result.heading);
                subheading.append(result.subheading);
                if (result.code !== '') {
                  code.append(result.code);
                } else {
                  code.classList.add('hidden');
                  document.getElementsByClassName('otsb-code-' + data.sectionId)[0].classList.add('hidden');
                }
              }
            } else {
              heading.append("The code has been deleted");
              code.classList.add('hidden');
            }

            // Add active class to next content
            changeButtonClose();
            success.classList.add('active');
            wheel.classList.remove('previous');
            wheel.classList.add('hidden');
            success.classList.remove('hidden');
            success.classList.add('visible');
          }

          function changeButtonClose() {
            var wheel = document.getElementById('PromotionPopupClose-' + data.sectionId),
              success = document.getElementById('PromotionPopupClose-Success-' + data.sectionId);
            wheel.classList.add('hidden');
            success.classList.remove('hidden');
          }

          function creatSvg() {
            var padding = { top: 20, right: 40, bottom: 0, left: 0 },
              w = 300 - padding.left - padding.right,
              h = 300 - padding.top - padding.bottom,
              r = Math.min(w, h) / 2,
              rotation = 0,
              oldrotation = 0,
              picked = 100000,
              oldpick = [];

            var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', 270);
            svg.setAttribute('height', h + padding.top + padding.bottom);
            document.getElementById('chart').appendChild(svg);

            var container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            container.setAttribute('class', 'chartholder');
            container.setAttribute(
              'transform',
              'translate(' + (w / 2 + padding.left + 5) + ',' + (h / 2 + padding.top) + ')'
            );
            svg.appendChild(container);

            var vis = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            container.appendChild(vis);

            var pie = function (item) {
              var pieData = [];
              var sum = item.reduce(function (a, b) {
                return a + 1;
              }, 0);
              var startAngle = 0;
              item.forEach(function (d) {
                var angle = (1 / sum) * Math.PI * 2;
                pieData.push({
                  item: d,
                  value: 1,
                  startAngle: startAngle,
                  endAngle: startAngle + angle,
                });
                startAngle += angle;
              });
              return pieData;
            };

            var arc = function (d) {
              var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
              var x1 = r * Math.cos(d.startAngle - Math.PI / 2);
              var y1 = r * Math.sin(d.startAngle - Math.PI / 2);
              var x2 = r * Math.cos(d.endAngle - Math.PI / 2);
              var y2 = r * Math.sin(d.endAngle - Math.PI / 2);
              var d =
                'M0,0L' +
                x1 +
                ',' +
                y1 +
                'A' +
                r +
                ',' +
                r +
                ' 0 ' +
                (d.endAngle - d.startAngle > Math.PI ? 1 : 0) +
                ',1 ' +
                x2 +
                ',' +
                y2 +
                'Z';
              path.setAttribute('d', d);
              return path;
            };

            var arcs = pie(item).map(function (d) {
              var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
              g.setAttribute('class', 'slice');

              var path = arc(d);
              path.setAttribute('fill', d.item.color);
              g.appendChild(path);

              var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
              var angle = (d.startAngle + d.endAngle) / 2;
              var x = (r - 10) * Math.cos(angle - Math.PI / 2);
              var y = (r - 10) * Math.sin(angle - Math.PI / 2);
              text.setAttribute(
                'transform',
                'translate(' + x + ',' + y + ') rotate(' + ((angle * 180) / Math.PI - 90) + ')'
              );

              text.setAttribute('text-anchor', 'end');
              text.textContent = d.item.label
              if(d.item.text_color != 'none') {
                text.setAttribute('fill', d.item.text_color)
              }
              g.appendChild(text);

              return g;
            });

            arcs.forEach(function (g) {
              vis.appendChild(g);
            });
            var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', 0);
            circle.setAttribute('cy', 0);
            circle.setAttribute('r', 20);
            circle.style.fill = 'white';
            circle.style.cursor = 'pointer';
            container.appendChild(circle);

            var borderCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            borderCircle.setAttribute('cx', 0);
            borderCircle.setAttribute('cy', 0);
            borderCircle.setAttribute('r', r);
            borderCircle.setAttribute('fill', 'none');
            borderCircle.setAttribute('stroke', 'black');
            borderCircle.setAttribute('stroke-width', '6');
            container.appendChild(borderCircle);

            var buttonSpin = document.getElementById('submit-spin-' + data.sectionId) ?? container;
            var submit = document.getElementById('submit-button-' + data.sectionId);
            var closeButton = document.getElementById('PromotionPopupClose-Success-' + data.sectionId);
            const form = document.getElementById('newsletter-' + data.sectionId);

            buttonSpin.addEventListener('click', spin);

            closeButton.addEventListener('click', resetModal);

            function validate() {
              submit.click();
            }

            function resetModal() {
              localStorage.removeItem('result-' + data.sectionId);
            }

            function spin() {
              const inputEmail = document.getElementById('Email--' + data.sectionId).value;
              const error = false;
              const format = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]/;

              if (!inputEmail || !format.test(inputEmail)) {
                validate();
                return;
              }

              buttonSpin.removeEventListener('click', spin);

              if (oldpick.length == item.length) {
                container.removeEventListener('click', spin);
                return;
              }

              var ps = 360 / item.length;
              var pieslice = Math.round(1440 / item.length);
              var rng = Math.floor(Math.random() * 1440 + 3600);

              rotation = Math.round(rng / ps) * ps;

              picked = Math.round(item.length - (rotation % 360) / ps);
              picked = picked >= item.length ? picked % item.length : picked;

              if (oldpick.indexOf(picked) !== -1) {
                spin();
                return;
              } else {
                oldpick.push(picked);
              }

              rotation += Math.round(ps / 2) - 35;
              animateRotation();

              function animateRotation() {
                var start = oldrotation % 360;
                var end = rotation;
                var duration = 3000;
                var startTime = null;

                function easeOutCubic(t) {
                  return --t * t * t + 1;
                }

                function animate(time) {
                  if (!startTime) startTime = time;
                  var progress = time - startTime;
                  var t = Math.min(progress / duration, 1);
                  var easedT = easeOutCubic(t);
                  var current = start + (end - start) * easedT;
                  vis.setAttribute('transform', 'rotate(' + current + ')');
                  if (t < 1) {
                    requestAnimationFrame(animate);
                  } else {
                    oldrotation = rotation;
                    buttonSpin.addEventListener('click', spin);
                    setTimeout(function () {
                      // ajaxFormInit(form);
                      if (!isExpireSave()) {
                        setExpire();
                      }
                      setResult(picked);
                      submit.click();
                    }, 1000); // Gọi hàm showSuccess sau khi vòng quay hoàn tất
                  }
                }

                requestAnimationFrame(animate);
              }

              function setResult(picked) {
                const resultItem = {
                  section: data.sectionId,
                  picked: item[picked].id,
                };
                localStorage.setItem('result-' + data.sectionId, JSON.stringify(resultItem));
              }

              function setExpire() {
                const item = {
                  section: data.sectionId,
                  expires: Date.now() + data.delayDays * 24 * 60 * 60 * 1000,
                };

                localStorage.setItem(data.sectionId, JSON.stringify(item));
                //remove storage data, the full popup will be displayed when the site applies the reappear rule.
                localStorage.removeItem('current-' + data.sectionId);
              }

              function isExpireSave() {
                const item = xParseJSONOTSB(localStorage.getItem(data.sectionId));
                if (item == null) return false;

                if (Date.now() > item.expires) {
                  localStorage.removeItem(data.sectionId);
                  return false;
                }

                return true;
              }
            }
          }
        },
      }));
      Alpine.data('otsb_xPopupsSpinSuccess', (data) => ({
        init() {
          const jsonString = data.data_wheel.replace(/'/g, '"');

          // Parse the JSON string
          const item = JSON.parse(jsonString);
          const wheel = document.getElementById('otsb-wheel-' + data.sectionId),
            success = document.getElementById('otsb-wheel-success-' + data.sectionId),
            heading = document.getElementById('otsb-success-heading-' + data.sectionId),
            subheading = document.getElementById('otsb-success-subheading-' + data.sectionId),
            code = document.getElementById('otsb-success-code-' + data.sectionId);
          document.addEventListener('shopify:block:select', (event) => {
            console.log('run: otsb_xPopupsSpinSuccess');
            const selectedBlockId = event.detail.blockId;
            if (data.block_id === selectedBlockId) {
              showSuccess(2);
            }
          });
          document.addEventListener('shopify:block:deselect', (event) => {
            console.log('run: otsb_xPopupsSpinSuccess');
            const selectedBlockId = event.detail.blockId;
            if (data.block_id === selectedBlockId) {
              showSpin();
            }
          });

          function showSuccess(picked) {
            // Add active class to next content
            // changeButtonClose()
            success.classList.add('active');
            wheel.classList.remove('previous');
            wheel.classList.add('hidden');
            success.classList.remove('hidden');
            success.classList.add('visible');
          }
          function showSpin() {
            wheel.classList.add('active');
            success.classList.remove('previous');
            success.classList.add('hidden');
            wheel.classList.remove('hidden');
            wheel.classList.add('visible');
          }

          function changeButtonClose() {
            var wheel = document.getElementById('PromotionPopupClose-' + data.sectionId),
              success = document.getElementById('PromotionPopupClose-Success-' + data.sectionId);
            wheel.classList.add('hidden');
            success.classList.remove('hidden');
          }
        },
      }));
    });
  });
}
if (!window.otsb.loadedScript.includes('otsb-popup-intent.js')) {
  window.otsb.loadedScript.push('otsb-popup-intent.js');
  requestAnimationFrame(() => {
    document.addEventListener('alpine:init', () => {
      Alpine.store('otsb_xPopupExitIntent', {
        thankiu_page_active_blocks: {},
      });
      Alpine.data('otsb_popupIntent', (blockId, sectionId) => {
        return {
          init() {
            if (Shopify && Shopify.designMode) {
              document.addEventListener('shopify:block:select', (event) => {
                const selectedBlockId = event.detail.blockId;
                console.log(Alpine.store('otsb_xPopupExitIntent')?.thankiu_page_active_blocks);
                if (!Alpine.store('otsb_xPopupExitIntent')?.thankiu_page_active_blocks?.[blockId]) {
                  Alpine.store('otsb_xPopupExitIntent').thankiu_page_active_blocks[blockId] = false;
                }
                Alpine.store('otsb_xPopupExitIntent').thankiu_page_active_blocks[blockId] = selectedBlockId === blockId;
                console.log('Runnnn');
              });

              document.addEventListener('shopify:block:deselect', (event) => {
                const selectedBlockId = event.detail.blockId;
                if (selectedBlockId == blockId) {
                  Alpine.store('otsb_xPopupExitIntent').thankiu_page_active_blocks[blockId] = false;
                }
              });
            }
          },
        };
      });
    });
  });
}
