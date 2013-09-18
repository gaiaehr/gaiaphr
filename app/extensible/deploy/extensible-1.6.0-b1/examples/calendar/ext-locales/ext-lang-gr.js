/*!
 * Extensible 1.6.0-b1
 * Copyright(c) 2010-2012 Extensible, LLC
 * licensing@ext.ensible.com
 * http://ext.ensible.com
 */
/**
 * Greek (Old Version) Translations by Vagelis
 * 03-June-2007
 */
Ext.onReady(function(){
    var cm = Ext.ClassManager, 
        exists = Ext.Function.bind(cm.get, cm);

    if(Ext.Updater) {
        Ext.Updater.defaults.indicatorText = '<div class="loading-indicator">Öüñôùóç...</div>';
    }

    if(exists('Ext.view.View')){
        Ext.view.View.prototype.emptyText = "";
    }

    if(exists('Ext.grid.Panel')){
        Ext.grid.Panel.prototype.ddText = "{0} åðéëåãì�?íç(åò) ãñáììÞ(�?ò)";
    }

    if(Ext.TabPanelItem){
        Ext.TabPanelItem.prototype.closeText = "Êëåßóôå áõôÞ ôçí êáñô�?ëá";
    }

    if(exists('Ext.form.field.Base')){
        Ext.form.field.Base.prototype.invalidText = "Ç ôéìÞ óôï ðåäßï äåí åßíáé �?ãêõñç";
    }

    if(Ext.LoadMask){
        Ext.LoadMask.prototype.msg = "Öüñôùóç...";
    }

    if(Ext.Date) {
        Ext.Date.monthNames = [
        "ÉáíïõÜñéïò",
        "ÖåâñïõÜñéïò",
        "ÌÜñôéïò",
        "�?ðñßëéïò",
        "ÌÜéïò",
        "Éïýíéïò",
        "Éïýëéïò",
        "�?ýãïõóôïò",
        "Óåðô�?ìâñéïò",
        "�?êôþâñéïò",
        "�?ï�?ìâñéïò",
        "Äåê�?ìâñéïò"
        ];

        Ext.Date.dayNames = [
        "ÊõñéáêÞ",
        "Äåõô�?ñá",
        "Ôñßôç",
        "ÔåôÜñôç",
        "�?�?ìðôç",
        "�?áñáóêåõÞ",
        "ÓÜââáôï"
        ];
    }

    if(Ext.MessageBox){
        Ext.MessageBox.buttonText = {
            ok     : "ÅíôÜîåé",
            cancel : "�?êýñùóç",
            yes    : "�?áé",
            no     : "¼÷é"
        };
    }

    if(exists('Ext.util.Format')){
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '\u20ac',  // Greek Euro
            dateFormat: 'ì/ç/Å'
        });
    }

    if(exists('Ext.picker.Date')){
        Ext.apply(Ext.picker.Date.prototype, {
            todayText         : "ÓÞìåñá",
            minText           : "Ç çìåñïìçíßá áõôÞ åßíáé ðñéí ôçí ìéêñüôåñç çìåñïìçíßá",
            maxText           : "Ç çìåñïìçíßá áõôÞ åßíáé ìåôÜ ôçí ìåãáëýôåñç çìåñïìçíßá",
            disabledDaysText  : "",
            disabledDatesText : "",
            monthNames	: Ext.Date.monthNames,
            dayNames		: Ext.Date.dayNames,
            nextText          : 'Åðüìåíïò ÌÞíáò (Control+Right)',
            prevText          : '�?ñïçãïýìåíïò ÌÞíáò (Control+Left)',
            monthYearText     : 'Åðéë�?îôå ÌÞíá (Control+Up/Down ãéá ìåôáêßíçóç óôá �?ôç)',
            todayTip          : "{0} (Spacebar)",
            format            : "ì/ç/Å"
        });
    }

    if(exists('Ext.toolbar.Paging')){
        Ext.apply(Ext.PagingToolbar.prototype, {
            beforePageText : "Óåëßäá",
            afterPageText  : "áðü {0}",
            firstText      : "�?ñþôç óåëßäá",
            prevText       : "�?ñïçãïýìåíç óåëßäá",
            nextText       : "Åðüìåíç óåëßäá",
            lastText       : "Ôåëåõôáßá óåëßäá",
            refreshText    : "�?íáí�?ùóç",
            displayMsg     : "ÅìöÜíéóç {0} - {1} áðü {2}",
            emptyMsg       : 'Äåí âñ�?èçêáí åããñáö�?ò ãéá åìöÜíéóç'
        });
    }

    if(exists('Ext.form.field.Text')){
        Ext.apply(Ext.form.field.Text.prototype, {
            minLengthText : "Ôï åëÜ÷éóôï ì�?ãåèïò ãéá áõôü ôï ðåäßï åßíáé {0}",
            maxLengthText : "Ôï ì�?ãéóôï ì�?ãåèïò ãéá áõôü ôï ðåäßï åßíáé {0}",
            blankText     : "Ôï ðåäßï áõôü åßíáé õðï÷ñåùôïêü",
            regexText     : "",
            emptyText     : null
        });
    }

    if(exists('Ext.form.field.Number')){
        Ext.apply(Ext.form.field.Number.prototype, {
            minText : "Ç åëÜ÷éóôç ôéìÞ ãéá áõôü ôï ðåäßï åßíáé {0}",
            maxText : "Ç ì�?ãéóôç ôéìÞ ãéá áõôü ôï ðåäßï åßíáé {0}",
            nanText : "{0} äåí åßíáé �?ãêõñïò áñéèìüò"
        });
    }

    if(exists('Ext.form.field.Date')){
        Ext.apply(Ext.form.field.Date.prototype, {
            disabledDaysText  : "�?ðåíåñãïðïéçì�?íï",
            disabledDatesText : "�?ðåíåñãïðïéçì�?íï",
            minText           : "Ç çìåñïìçíßá ó' áõôü ôï ðåäßï ðñ�?ðåé íá åßíáé ìåôÜ áðü {0}",
            maxText           : "Ç çìåñïìçíßá ó' áõôü ôï ðåäßï ðñ�?ðåé íá åßíáé ðñéí áðü {0}",
            invalidText       : "{0} äåí åßíáé �?ãêõñç çìåñïìçíßá - ðñ�?ðåé íá åßíáé ôçò ìïñöÞò {1}",
            format            : "ì/ç/Å"
        });
    }

    if(exists('Ext.form.field.ComboBox')){
        Ext.apply(Ext.form.field.ComboBox.prototype, {
            valueNotFoundText : undefined
        });
        Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
            loadingText       : "Öüñôùóç..."
        });
    }

    if(exists('Ext.form.field.VTypes')){
        Ext.apply(Ext.form.field.VTypes, {
            emailText    : '�?õôü ôï ðåäßï ðñ�?ðåé íá åßíáé e-mail address ôçò ìïñöÞò "user@example.com"',
            urlText      : '�?õôü ôï ðåäßï ðñ�?ðåé íá åßíáé ìéá äéåýèõíóç URL ôçò ìïñöÞò "http:/'+'/www.example.com"',
            alphaText    : '�?õôü ôï ðåäßï ðñ�?ðåé íá ðåñé�?÷åé ãñÜììáôá êáé _',
            alphanumText : '�?õôü ôï ðåäßï ðñ�?ðåé íá ðåñé�?÷åé ãñÜììáôá, áñéèìïýò êáé _'
        });
    }

    if(exists('Ext.grid.header.Container')){
        Ext.apply(Ext.grid.header.Container.prototype, {
            sortAscText  : "�?ýîïõóá Ôáîéíüìçóç",
            sortDescText : "Öèßíïõóá Ôáîéíüìçóç",
            lockText     : "Êëåßäùìá óôÞëçò",
            unlockText   : "Îåêëåßäùìá óôÞëçò",
            columnsText  : "ÓôÞëåò"
        });
    }

    if(exists('Ext.grid.PropertyColumnModel')){
        Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
            nameText   : "¼íïìá",
            valueText  : "ÔéìÞ",
            dateFormat : "ì/ç/Å"
        });
    }

});