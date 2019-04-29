
//addressPicker地址控件 v1.0.0

window.addressPicker = (function() {
    var AddressCalendar = function() {
        this.gearDate;
        this.minY = 1900;
        this.minM = 1;
        this.minD = 1;
        this.maxY = 2099;
        this.maxM = 12;
        this.maxD = 31;
        this.value="";
        this.title = "";
        this.type = "";
        this.areaData = areaData;
        this.provinceCount = areaData.length;
    };
    AddressCalendar.prototype = {
        init: function(params) {
            this.defaults = params.defaults; // 默认地区
            this.trigger = document.querySelector(params.trigger);
            this.title = params.title ? params.title : "";
            this.type = params.type ? params.type : "province";
            this.onClose= params.onClose;
            this.onSubmit= params.onSubmit;
            this.onChange= params.onChange;
            this.bindEvent(this.type, this.defaults); // 增加参数(修改原插件-hxj)
        },
        bindEvent: function(type, defaults) {
            var _self = this;
            var isTouched = false , isMoved = false;
            var pree;
            //呼出省份插件
            function popupProvince(e) {
                _self.gearDate = document.createElement("div");
                _self.gearDate.className = "gearDate";
                _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
                    '<div class="date_btn_box">' +
                    '<div class="date_btn lcalendar_cancel">取消</div>' +
                    '<div class="date_title">'+ _self.title +'</div>'+
                    '<div class="date_btn lcalendar_finish">确定</div>' +
                    '</div>' +
                    '<div class="date_roll_mask">' +
                    '<div class="date_roll">' +
                    '<div>' +
                    '<div class="gear date_yy" data-datetype="date_yy"></div>' +
                    '<div class="date_grid">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div><div class="date_bg" style="width:100%;height:100%;"></div>';
                document.body.appendChild(_self.gearDate);
                provinceCtrlInit(defaults); // 增加参数(修改原插件-hxj)
                var lcalendar_cancel = _self.gearDate.querySelector(".lcalendar_cancel");
                lcalendar_cancel.addEventListener('touchstart', closeAddressAlert);
                var lcalendar_finish = _self.gearDate.querySelector(".lcalendar_finish");
                lcalendar_finish.addEventListener('touchstart', finishMobileDate);
                var lcalendar_bg = _self.gearDate.querySelector(".date_bg");
                lcalendar_bg.addEventListener('click', closeAddressAlert);
                var date_yy = _self.gearDate.querySelector(".date_yy");
                date_yy.addEventListener('touchstart', gearTouchStart);
                date_yy.addEventListener('touchmove', gearTouchMove);
                date_yy.addEventListener('touchend', gearTouchEnd);
                //-------------------------------------------------------------
                lcalendar_cancel.addEventListener('click', closeAddressAlert);
                lcalendar_finish.addEventListener('click', finishMobileDate);
                date_yy.addEventListener('mousedown', gearTouchStart);
                date_yy.addEventListener('mousemove', gearTouchMove);
                date_yy.addEventListener('mouseup', gearTouchEnd);
                _self.gearDate.querySelector(".date_roll_mask").addEventListener('mouseleave', gearTouchOut);
                _self.gearDate.querySelector(".date_roll_mask").addEventListener('mouseup', gearTouchOut);
            }
            //初始省份插件
            function provinceCtrlInit(defaults) {
                _self.gearDate.querySelector(".date_yy").setAttribute("val", "0");
                setDateGearTooth();
            }
            //呼出城市插件
            function popupCity(e) {
                _self.gearDate = document.createElement("div");
                _self.gearDate.className = "gearDate";
                _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
                    '<div class="date_btn_box">' +
                    '<div class="date_btn lcalendar_cancel">取消</div>' +
                    '<div class="date_title">'+ _self.title +'</div>'+
                    '<div class="date_btn lcalendar_finish">确定</div>' +
                    '</div>' +
                    '<div class="date_roll_mask">' +
                    '<div class="ym_roll">' +
                    '<div>' +
                    '<div class="gear date_yy" data-datetype="date_yy"></div>' +
                    '<div class="date_grid">' +
                    '<div>年</div>' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear date_mm" data-datetype="date_mm"></div>' +
                    '<div class="date_grid">' +
                    '<div>月</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div><div class="date_bg" style="width:100%;height:100%;"></div>';
                document.body.appendChild(_self.gearDate);
                cityCtrlInit();
                var lcalendar_cancel = _self.gearDate.querySelector(".lcalendar_cancel");
                lcalendar_cancel.addEventListener('touchstart', closeAddressAlert);
                var lcalendar_finish = _self.gearDate.querySelector(".lcalendar_finish");
                lcalendar_finish.addEventListener('touchstart', finishMobileYM);
                var lcalendar_bg = _self.gearDate.querySelector(".date_bg");
                lcalendar_bg.addEventListener('click', closeAddressAlert);
                var date_yy = _self.gearDate.querySelector(".date_yy");
                var date_mm = _self.gearDate.querySelector(".date_mm");
                date_yy.addEventListener('touchstart', gearTouchStart);
                date_mm.addEventListener('touchstart', gearTouchStart);
                date_yy.addEventListener('touchmove', gearTouchMove);
                date_mm.addEventListener('touchmove', gearTouchMove);
                date_yy.addEventListener('touchend', gearTouchEnd);
                date_mm.addEventListener('touchend', gearTouchEnd);
                //-------------------------------------------------------------
                lcalendar_cancel.addEventListener('click', closeAddressAlert);
                lcalendar_finish.addEventListener('click', finishMobileYM);
                date_yy.addEventListener('mousedown', gearTouchStart);
                date_mm.addEventListener('mousedown', gearTouchStart);
                date_yy.addEventListener('mousemove', gearTouchMove);
                date_mm.addEventListener('mousemove', gearTouchMove);
                date_yy.addEventListener('mouseup', gearTouchEnd);
                date_mm.addEventListener('mouseup', gearTouchEnd);
                _self.gearDate.querySelector(".date_roll_mask").addEventListener('mouseleave', gearTouchOut);
                _self.gearDate.querySelector(".date_roll_mask").addEventListener('mouseup', gearTouchOut);
            }
            //初始化城市插件
            function cityCtrlInit() {
                _self.gearDate.querySelector(".date_yy").setAttribute("val", "0");
                _self.gearDate.querySelector(".date_mm").setAttribute("val", "0");
                // debugger;
                setDateGearTooth();
            }
            //呼出城区插件
            function popupCountry(e) {
                _self.gearDate = document.createElement("div");
                _self.gearDate.className = "gearDate";
                _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
                    '<div class="date_btn_box">' +
                    '<div class="date_btn lcalendar_cancel">取消</div>' +
                    '<div class="date_title">'+ _self.title +'</div>'+
                    '<div class="date_btn lcalendar_finish">确定</div>' +
                    '</div>' +
                    '<div class="date_roll_mask">' +
                    '<div class="date_roll">' +
                    '<div>' +
                    '<div class="gear date_yy" data-datetype="date_yy"></div>' +
                    '<div class="date_grid">' +
                    '<div></div>' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear date_mm" data-datetype="date_mm"></div>' +
                    '<div class="date_grid">' +
                    '<div></div>' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear date_dd" data-datetype="date_dd"></div>' +
                    '<div class="date_grid">' +
                    '<div></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div><div class="date_bg" style="width:100%;height:100%;"></div>';
                document.body.appendChild(_self.gearDate);
                countryCtrlInit();
                var lcalendar_cancel = _self.gearDate.querySelector(".lcalendar_cancel");
                lcalendar_cancel.addEventListener('touchstart', closeAddressAlert);
                var lcalendar_finish = _self.gearDate.querySelector(".lcalendar_finish");
                lcalendar_finish.addEventListener('touchstart', finishMobileDate);
                var lcalendar_bg = _self.gearDate.querySelector(".date_bg");
                lcalendar_bg.addEventListener('click', closeAddressAlert);
                var date_yy = _self.gearDate.querySelector(".date_yy");
                var date_mm = _self.gearDate.querySelector(".date_mm");
                var date_dd = _self.gearDate.querySelector(".date_dd");
                date_yy.addEventListener('touchstart', gearTouchStart);
                date_mm.addEventListener('touchstart', gearTouchStart);
                date_dd.addEventListener('touchstart', gearTouchStart);
                date_yy.addEventListener('touchmove', gearTouchMove);
                date_mm.addEventListener('touchmove', gearTouchMove);
                date_dd.addEventListener('touchmove', gearTouchMove);
                date_yy.addEventListener('touchend', gearTouchEnd);
                date_mm.addEventListener('touchend', gearTouchEnd);
                date_dd.addEventListener('touchend', gearTouchEnd);
                //-------------------------------------------------------------
                lcalendar_cancel.addEventListener('click', closeAddressAlert);
                lcalendar_finish.addEventListener('click', finishMobileDate);
                date_yy.addEventListener('mousedown', gearTouchStart);
                date_mm.addEventListener('mousedown', gearTouchStart);
                date_dd.addEventListener('mousedown', gearTouchStart);
                date_yy.addEventListener('mousemove', gearTouchMove);
                date_mm.addEventListener('mousemove', gearTouchMove);
                date_dd.addEventListener('mousemove', gearTouchMove);
                date_yy.addEventListener('mouseup', gearTouchEnd);
                date_mm.addEventListener('mouseup', gearTouchEnd);
                date_dd.addEventListener('mouseup', gearTouchEnd);
                _self.gearDate.querySelector(".date_roll_mask").addEventListener('mouseleave', gearTouchOut);
                _self.gearDate.querySelector(".date_roll_mask").addEventListener('mouseup', gearTouchOut);
            }
            //初始化城区插件
            function countryCtrlInit(defaults) {
                _self.gearDate.querySelector(".date_yy").setAttribute("val", "0");
                _self.gearDate.querySelector(".date_mm").setAttribute("val", "0");
                _self.gearDate.querySelector(".date_dd").setAttribute("val", "0");
                setDateGearTooth();
            }
            //重置日期节点个数
            function setDateGearTooth() {
                var passY = _self.areaData.length;
                // var passY = 28;
                var date_yy = _self.gearDate.querySelector(".date_yy");
                var itemStr = "";
                if (date_yy && date_yy.getAttribute("val")) {
                    //得到年份的值
                    var yyVal = parseInt(date_yy.getAttribute("val"));
                    //p 当前节点前后需要展示的节点个数
                    for (var p = 0; p < passY; p++) {
                        itemStr += "<div class='tooth'>" + (_self.areaData[p]["name"]) + "</div>";
                    }
                    date_yy.innerHTML = itemStr;
                    var top = Math.floor(parseFloat(date_yy.getAttribute('top')));
                    if (!isNaN(top)) {
                        top % 2 == 0 ? (top = top) : (top = top + 1);
                        top > 8 && (top = 8);
                        var minTop = 8 - (passY - 1) * 2;
                        top < minTop && (top = minTop);
                        date_yy.style["-webkit-transform"] = 'translate3d(0,' + top + 'em,0)';
                        date_yy.setAttribute('top', top + 'em');
                        yyVal = Math.abs(top - 8) / 2;
                        date_yy.setAttribute("val", yyVal);
                    } else {
                        date_yy.style["-webkit-transform"] = 'translate3d(0,' + (8 - yyVal * 2) + 'em,0)';
                        date_yy.setAttribute('top', 8 - yyVal * 2 + 'em');
                    }
                } else {
                    return;
                }
                var date_mm = _self.gearDate.querySelector(".date_mm");
                if (date_mm && date_yy.getAttribute("val")) {
                    itemStr = "";
                    //得到月份的值
                    var mmVal = parseInt(date_mm.getAttribute("val"));
                    var yyVal = parseInt(date_yy.getAttribute("val"));
                    var maxM = this.areaData[yyVal]['child'].length - 1;
                    var minM = 0;
                    //p 当前节点前后需要展示的节点个数
                    for (var p = 0; p < maxM + 1; p++) {
                        // itemStr += "<div class='tooth'>" + (minM + p + 1) + "</div>";
                        itemStr += "<div class='tooth'>" + this.areaData[yyVal]['child'][p].name + "</div>";
                    }
                    date_mm.innerHTML = itemStr;
                    if (mmVal > maxM) {
                        mmVal = maxM;
                        date_mm.setAttribute("val", mmVal);
                    } else if (mmVal < minM) {
                        mmVal = maxM;
                        date_mm.setAttribute("val", mmVal);
                    }
                    // console.log(8 - (mmVal - minM) * 2);
                    date_mm.style["-webkit-transform"] = 'translate3d(0,' + (8 - (mmVal - minM) * 2) + 'em,0)';
                    date_mm.setAttribute('top', 8 - (mmVal - minM) * 2 + 'em');
                } else {
                    return;
                }
                var date_dd = _self.gearDate.querySelector(".date_dd");
                if (date_dd && date_dd.getAttribute("val")) {
                    itemStr = "";
                    //得到日期的值
                    var ddVal = parseInt(date_dd.getAttribute("val"));
                    var mmVal = parseInt(date_mm.getAttribute("val"));
                    var yyVal = parseInt(date_yy.getAttribute("val"));
                    //p 当前节点前后需要展示的节点个数
                    var maxD = this.areaData[yyVal]['child'][mmVal]['child'].length - 1;
                    var minD = 0;
                    for (var p = 0; p < maxD + 1; p++) {
                        itemStr += "<div class='tooth'>" + this.areaData[yyVal]['child'][mmVal]['child'][p].name + "</div>";
                    }
                    date_dd.innerHTML = itemStr;
                    if (ddVal > maxD) {
                        ddVal = maxD;
                        date_dd.setAttribute("val", ddVal);
                    } else if (ddVal < minD) {
                        ddVal = minD;
                        date_dd.setAttribute("val", ddVal);
                    }
                    date_dd.style["-webkit-transform"] = 'translate3d(0,' + (8 - (ddVal - minD) * 2) + 'em,0)';
                    date_dd.setAttribute('top', 8 - (ddVal - minD) * 2 + 'em');
                } else {
                    return;
                }
            }
            //触摸开始
            function gearTouchStart(e) {
            	if (isMoved || isTouched) return;
                isTouched = true;
                e.preventDefault();
                var target = e.target;

                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break
                    }
                }
                clearInterval(target["int_" + target.id]);
                target["old_" + target.id] = e.targetTouches ? e.targetTouches[0].screenY : e.pageY;
                target["o_t_" + target.id] = (new Date()).getTime();
                var top = target.getAttribute('top');
                if (top) {
                    target["o_d_" + target.id] = parseFloat(top.replace(/em/g, ""));
                } else {
                    target["o_d_" + target.id] = 0;
                };
                pree=e;
            }
            //手指移动
            function gearTouchMove(e) {
            	if (!isTouched) return;
            	isMoved = true;
                e.preventDefault();
                if(pree) var target = pree.target; else
                var target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break
                    }
                }
                target["new_" + target.id] = e.targetTouches ? e.targetTouches[0].screenY : e.pageY;
                target["n_t_" + target.id] = (new Date()).getTime();
                //var f = (target["new_" + target.id] - target["old_" + target.id]) * 18 / target.clientHeight;
                var f = (target["new_" + target.id] - target["old_" + target.id]) * 18 / 370;
                target["pos_" + target.id] = target["o_d_" + target.id] + f;
                target.style["-webkit-transform"] = 'translate3d(0,' + target["pos_" + target.id] + 'em,0)';
                target.setAttribute('top', target["pos_" + target.id] + 'em');
            }
            //离开屏幕
            function gearTouchEnd(e) {
            	if (!isTouched || !isMoved) {
                    isTouched = isMoved = false;
                    return;
                }
                isTouched = isMoved = false;
                e.preventDefault();
                if(pree) var target = pree.target; else
                var target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break;
                    }
                }
                var flag = (target["new_" + target.id] - target["old_" + target.id]) / (target["n_t_" + target.id] - target["o_t_" + target.id]);
                if (Math.abs(flag) <= 0.2) {
                    target["spd_" + target.id] = (flag < 0 ? -0.08 : 0.08);
                } else {
                    if (Math.abs(flag) <= 0.5) {
                        target["spd_" + target.id] = (flag < 0 ? -0.16 : 0.16);
                    } else {
                        target["spd_" + target.id] = flag / 2;
                    }
                }
                if (!target["pos_" + target.id]) {
                    target["pos_" + target.id] = 0;
                }
                rollGear(target);
                pree=null;
            };
            //离开区域
            function gearTouchOut(e) {
            	gearTouchEnd(pree);
            };
            //缓动效果
            function rollGear(target) {
                var d = 0;
                var stopGear = false;
                // var passY = _self.maxY - _self.minY + 1; **
                var passY = _self.areaData.length;
                clearInterval(target["int_" + target.id]);
                target["int_" + target.id] = setInterval(function() {
                    // debugger
                    var pos = target["pos_" + target.id];
                    var speed = target["spd_" + target.id] * Math.exp(-0.1 * d);
                    pos += speed;
                    if (Math.abs(speed) > 0.1) {} else {
                        speed = 0.1;
                        var b = Math.round(pos / 2) * 2;
                        if (Math.abs(pos - b) < 0.05) {
                            stopGear = true;
                        } else {
                            if (pos > b) {
                                pos -= speed
                            } else {
                                pos += speed
                            }
                        }
                    }
                    if (pos > 8) {
                        pos = 8;
                        stopGear = true;
                    }
                    switch (target.dataset.datetype) {
                        case "date_yy":
                            var minTop = 8 - (passY - 1) * 2;
                            if (pos < minTop) {
                                pos = minTop;
                                stopGear = true;
                            }
                            if (stopGear) {
                                var gearVal = Math.abs(pos - 8) / 2;
                                setGear(target, gearVal);
                                clearInterval(target["int_" + target.id]);
                            }
                            break;
                        case "date_mm":
                            var date_yy = _self.gearDate.querySelector(".date_yy");
                            //得到年份的值
                            var yyVal = parseInt(date_yy.getAttribute("val"));
                            var maxM = this.areaData[yyVal]['child'].length - 1;
                            var minM = 0;
                            var minTop = 8 - (maxM - minM) * 2;
                            if (pos < minTop) {
                                pos = minTop;
                                stopGear = true;
                            }
                            if (stopGear) {
                                var gearVal = Math.abs(pos - 8) / 2 + minM;
                                setGear(target, gearVal);
                                clearInterval(target["int_" + target.id]);
                            }
                            break;
                        case "date_dd":
                            var date_yy = _self.gearDate.querySelector(".date_yy");
                            var date_mm = _self.gearDate.querySelector(".date_mm");
                            //得到年份的值
                            var yyVal = parseInt(date_yy.getAttribute("val"));
                            //得到月份的值
                            var mmVal = parseInt(date_mm.getAttribute("val"));
                            //返回月份的天数
                            var maxD = this.areaData[yyVal]['child'][mmVal]['child'].length - 1;
                            var minD = 0;
                            var minTop = 8 - (maxD - minD) * 2;
                            if (pos < minTop) {
                                pos = minTop;
                                stopGear = true;
                            }
                            if (stopGear) {
                                var gearVal = Math.abs(pos - 8) / 2 + minD;
                                setGear(target, gearVal);
                                clearInterval(target["int_" + target.id]);
                            }
                            break;
                        default:
                    }
                    target["pos_" + target.id] = pos;
                    target.style["-webkit-transform"] = 'translate3d(0,' + pos + 'em,0)';
                    target.setAttribute('top', pos + 'em');
                    d++;
                }, 30);
            }
            //控制插件滚动后停留的值
            function setGear(target, val) {
                val = Math.round(val);
                target.setAttribute("val", val);
                if (/date/.test(target.dataset.datetype)) {
                    setDateGearTooth();
                } else {
                    setTimeGearTooth();
                }
            }
            //取消
            function closeAddressAlert(e) {
                e.preventDefault();
                isTouched = isMoved = false;
                if(_self.onClose) _self.onClose();
                var evt = new CustomEvent('input');
                _self.trigger.dispatchEvent(evt);
                document.body.removeChild(_self.gearDate);
            }
            //日期确认
            function finishMobileDate(e) {
                var passY = _self.maxY - _self.minY + 1;
                var date_yy = parseInt(Math.round(_self.gearDate.querySelector(".date_yy").getAttribute("val")));
                var date_mm = parseInt(Math.round(_self.gearDate.querySelector(".date_mm").getAttribute("val"))) + 1;
                date_mm = date_mm > 9 ? date_mm : '0' + date_mm;
                var date_dd = parseInt(Math.round(_self.gearDate.querySelector(".date_dd").getAttribute("val"))) + 1;
                date_dd = date_dd > 9 ? date_dd : '0' + date_dd;
                _self.trigger.value = (date_yy % passY + _self.minY) + "-" + date_mm + "-" + date_dd;
                _self.value = _self.trigger.value;
                if(_self.onSubmit) _self.onSubmit();
                closeAddressAlert(e);
            }
            //年月确认
            function finishMobileYM(e) {
                var passY = _self.maxY - _self.minY + 1;
                var date_yy = parseInt(Math.round(_self.gearDate.querySelector(".date_yy").getAttribute("val")));
                var date_mm = parseInt(Math.round(_self.gearDate.querySelector(".date_mm").getAttribute("val"))) + 1;
                date_mm = date_mm > 9 ? date_mm : '0' + date_mm;
                _self.trigger.value = (date_yy % passY + _self.minY) + "-" + date_mm;
                _self.value = _self.trigger.value;
                if(_self.onSubmit) _self.onSubmit();
                closeAddressAlert(e);
            }
            //日期时间确认
            function finishMobileDateTime(e) {
                var passY = _self.maxY - _self.minY + 1;
                var date_yy = parseInt(Math.round(_self.gearDate.querySelector(".date_yy").getAttribute("val")));
                var date_mm = parseInt(Math.round(_self.gearDate.querySelector(".date_mm").getAttribute("val"))) + 1;
                date_mm = date_mm > 9 ? date_mm : '0' + date_mm;
                var date_dd = parseInt(Math.round(_self.gearDate.querySelector(".date_dd").getAttribute("val"))) + 1;
                date_dd = date_dd > 9 ? date_dd : '0' + date_dd;
                var time_hh = parseInt(Math.round(_self.gearDate.querySelector(".time_hh").getAttribute("val")));
                time_hh = time_hh > 9 ? time_hh : '0' + time_hh;
                var time_mm = parseInt(Math.round(_self.gearDate.querySelector(".time_mm").getAttribute("val")));
                time_mm = time_mm > 9 ? time_mm : '0' + time_mm;
                _self.trigger.value = (date_yy % passY + _self.minY) + "-" + date_mm + "-" + date_dd + " " + (time_hh.length < 2 ? "0" : "") + time_hh + (time_mm.length < 2 ? ":0" : ":") + time_mm;
                _self.value = _self.trigger.value;
                if(_self.onSubmit) _self.onSubmit();
                closeAddressAlert(e);
            }
            //时间确认
            function finishMobileTime(e) {
                var time_hh = parseInt(Math.round(_self.gearDate.querySelector(".time_hh").getAttribute("val")));
                time_hh = time_hh > 9 ? time_hh : '0' + time_hh;
                var time_mm = parseInt(Math.round(_self.gearDate.querySelector(".time_mm").getAttribute("val")));
                time_mm = time_mm > 9 ? time_mm : '0' + time_mm;
                _self.trigger.value = (time_hh.length < 2 ? "0" : "") + time_hh + (time_mm.length < 2 ? ":0" : ":") + time_mm;
                _self.value = _self.trigger.value;
                if(_self.onSubmit) _self.onSubmit();
                closeAddressAlert(e);
            }
            _self.trigger.addEventListener('click', {
                "province": popupProvince,
                "city": popupCity,
                "country": popupCountry
            }[type]);
        }
    }
    return AddressCalendar;
})();
