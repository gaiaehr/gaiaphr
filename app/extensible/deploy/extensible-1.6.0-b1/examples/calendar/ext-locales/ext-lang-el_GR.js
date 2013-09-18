/*!
 * Extensible 1.6.0-b1
 * Copyright(c) 2010-2012 Extensible, LLC
 * licensing@ext.ensible.com
 * http://ext.ensible.com
 */
/**
 * Greek translation
 * By thesilentman (utf8 encoding)
 * 27 Apr 2008
 *
 * Changes since previous (second) Version:
 * + added Ext.Date.shortMonthNames 
 * + added Ext.Date.getShortMonthName 
 * + added Ext.Date.monthNumbers
 * + added Ext.grid.GroupingFeature
 */
Ext.onReady(function() {
    var cm = Ext.ClassManager, 
        exists = Ext.Function.bind(cm.get, cm);

    if(Ext.Updater){
        Ext.Updater.defaults.indicatorText = '<div class="loading-indicator">Μεταφό�?τωση δεδομένων...</div>';
    }
    
    if(exists('Ext.view.View')){
        Ext.view.View.prototype.emptyText = "";
    }

    if(exists('Ext.grid.Panel')){
        Ext.grid.Panel.prototype.ddText = "{0} Επιλεγμένες σει�?ές";
    }

    if(Ext.TabPanelItem){
        Ext.TabPanelItem.prototype.closeText = "Κλείστε το tab";
    }

    if(exists('Ext.form.field.Base')){
        Ext.form.field.Base.prototype.invalidText = "Το πε�?ιεχόμενο του πεδίου δεν είναι αποδεκτό";
    }

    if(Ext.LoadMask){
        Ext.LoadMask.prototype.msg = "Μεταφό�?τωση δεδομένων...";
    }

    if(Ext.Date){
        Ext.Date.monthNames = [
        "Ιανουά�?ιος",
        "Φεβ�?ουά�?ιος",
        "Μά�?τιος",
        "Απ�?ίλιος",
        "Μάιος",
        "Ιο�?νιος",
        "Ιο�?λιος",
        "Α�?γουστος",
        "Σεπτέμβ�?ιος",
        "Οκτώβ�?ιος",
        "�?οέμβ�?ιος",
        "Δεκέμβ�?ιος"
        ];

        Ext.Date.shortMonthNames = [
        "Ιαν",
        "Φεβ",
        "Μά�?",
        "Απ�?",
        "Μάι",
        "Ιο�?",
        "Ιο�?",
        "Α�?γ",
        "Σεπ",
        "Οκτ",
        "�?οέ",
        "Δεκ"
        ];

        Ext.Date.getShortMonthName = function(month) {
            return Ext.Date.monthNames[month].substring(0, 3);
        };

        Ext.Date.monthNumbers = {
            Jan : 0,
            Feb : 1,
            Mar : 2,
            Apr : 3,
            May : 4,
            Jun : 5,
            Jul : 6,
            Aug : 7,
            Sep : 8,
            Oct : 9,
            Nov : 10,
            Dec : 11
        };

        Ext.Date.getMonthNumber = function(name) {
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        };


        Ext.Date.dayNames = [
        "Κυ�?ιακή",
        "Δευτέ�?α",
        "Τ�?ίτη",
        "Τετά�?τη",
        "Πέμπτη",
        "Πα�?ασκευή",
        "Σάββατο"
        ];
    }
    
    if(Ext.MessageBox){
        Ext.MessageBox.buttonText = {
            ok     : "OK",
            cancel : "Άκυ�?ο",
            yes    : "�?αι",
            no     : "Όχι"
        };
    }

    if(exists('Ext.util.Format')){
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '\u20ac',  // Greek Euro
            dateFormat: 'd/m/Y'
        });
    }

    if(exists('Ext.picker.Date')){
        Ext.apply(Ext.picker.Date.prototype, {
            todayText         : "Σήμε�?α",
            minText           : "Η Ημε�?ομηνία είναι π�?ογενέστε�?η από την παλαιότε�?η αποδεκτή",
            maxText           : "Η Ημε�?ομηνία είναι μεταγενέστε�?η από την νεότε�?η αποδεκτή",
            disabledDaysText  : "",
            disabledDatesText : "",
            monthNames  : Ext.Date.monthNames,
            dayNames    : Ext.Date.dayNames,
            nextText          : 'Επόμενος Μήνας (Control+Δεξί Βέλος)',
            prevText          : 'Π�?οηγο�?μενος Μήνας (Control + Α�?ιστε�?ό Βέλος)',
            monthYearText     : 'Επιλογή Μηνός (Control + Επάνω/Κάτω Βέλος για μεταβολή ετών)',
            todayTip          : "{0} (ΠΛήκτ�?ο Διαστήματος)",
            format            : "d/m/y"
        });
    }

    if(exists('Ext.toolbar.Paging')){
        Ext.apply(Ext.PagingToolbar.prototype, {
            beforePageText : "Σελίδα",
            afterPageText  : "από {0}",
            firstText      : "Π�?ώτη Σελίδα",
            prevText       : "Π�?οηγο�?μενη Σελίδα",
            nextText       : "Επόμενη Σελίδα",
            lastText       : "Τελευταία Σελίδα",
            refreshText    : "Ανανέωση",
            displayMsg     : "Εμφάνιση {0} - {1} από {2}",
            emptyMsg       : 'Δεν υπά�?χουν δεδομένα'
        });
    }

    if(exists('Ext.form.field.Text')){
        Ext.apply(Ext.form.field.Text.prototype, {
            minLengthText : "Το μικ�?ότε�?ο αποδεκτό μήκος για το πεδίο είναι {0}",
            maxLengthText : "Το μεγαλ�?τε�?ο αποδεκτό μήκος για το πεδίο είναι {0}",
            blankText     : "Το πεδίο είναι υποχ�?εωτικό",
            regexText     : "",
            emptyText     : null
        });
    }

    if(exists('Ext.form.field.Number')){
        Ext.apply(Ext.form.field.Number.prototype, {
            minText : "Η μικ�?ότε�?η τιμή του πεδίου είναι {0}",
            maxText : "Η μεγαλ�?τε�?η τιμή του πεδίου είναι {0}",
            nanText : "{0} δεν είναι αποδεκτός α�?ιθμός"
        });
    }

    if(exists('Ext.form.field.Date')){
        Ext.apply(Ext.form.field.Date.prototype, {
            disabledDaysText  : "Ανενε�?γό",
            disabledDatesText : "Ανενε�?γό",
            minText           : "Η ημε�?ομηνία αυτο�? του πεδίου π�?έπει να είναι μετά την {0}",
            maxText           : "Η ημε�?ομηνία αυτο�? του πεδίου π�?έπει να είναι π�?ιν την {0}",
            invalidText       : "{0} δεν είναι έγκυ�?η ημε�?ομηνία - π�?έπει να είναι στη μο�?φή {1}",
            format            : "d/m/y"
        });
    }

    if(exists('Ext.form.field.ComboBox')){
        Ext.apply(Ext.form.field.ComboBox.prototype, {
            valueNotFoundText : undefined
        });
        Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
            loadingText       : "Μεταφό�?τωση δεδομένων..."
        });
    }

    if(exists('Ext.form.field.VTypes')){
        Ext.apply(Ext.form.field.VTypes, {
            emailText    : 'Το πεδίο δέχεται μόνο διευθ�?νσεις Email σε μο�?φή "user@example.com"',
            urlText      : 'Το πεδίο δέχεται μόνο URL σε μο�?φή "http:/'+'/www.example.com"',
            alphaText    : 'Το πεδίο δέχεται μόνο χα�?ακτή�?ες και _',
            alphanumText : 'Το πεδίο δέχεται μόνο χα�?ακτή�?ες, α�?ιθμο�?ς και _'
        });
    }

    if(exists('Ext.form.field.HtmlEditor')){
        Ext.apply(Ext.form.field.HtmlEditor.prototype, {
            createLinkText : 'Δώστε τη διε�?θυνση (URL) για το σ�?νδεσμο (link):',
            buttonTips : {
                bold : {
                    title: 'Έντονα (Ctrl+B)',
                    text: 'Κάνετε το π�?οεπιλεγμένο κείμενο έντονο.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                italic : {
                    title: 'Πλάγια (Ctrl+I)',
                    text: 'Κάνετε το π�?οεπιλεγμένο κείμενο πλάγιο.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                underline : {
                    title: 'Υπογ�?άμμιση (Ctrl+U)',
                    text: 'Υπογ�?αμμίζετε το π�?οεπιλεγμένο κείμενο.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                increasefontsize : {
                    title: 'Μεγέθυνση κειμένου',
                    text: 'Μεγαλώνετε τη γ�?αμματοσει�?ά.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                decreasefontsize : {
                    title: 'Σμίκ�?υνση κειμένου',
                    text: 'Μικ�?αίνετε τη γ�?αμματοσει�?ά.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                backcolor : {
                    title: 'Χ�?ώμα Φόντου Κειμένου',
                    text: 'Αλλάζετε το χ�?ώμα στο φόντο του π�?οεπιλεγμένου κειμένου.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                forecolor : {
                    title: 'Χ�?ώμα Γ�?αμματοσει�?άς',
                    text: 'Αλλάζετε το χ�?ώμα στη γ�?αμματοσει�?ά του π�?οεπιλεγμένου κειμένου.',               
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                justifyleft : {
                    title: 'Α�?ιστε�?ή Στοίχιση Κειμένου',
                    text: 'Στοιχίζετε το κείμενο στα α�?ιστε�?ά.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                justifycenter : {
                    title: 'Κεντ�?ά�?ισμα Κειμένου',
                    text: 'Στοιχίζετε το κείμενο στο κέντ�?ο.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                justifyright : {
                    title: 'Δεξιά Στοίχιση Κειμένου',
                    text: 'Στοιχίζετε το κείμενο στα δεξιά.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                insertunorderedlist : {
                    title: 'Εισαγωγή Λίστας Κουκίδων',
                    text: 'Ξεκινήστε μια λίστα με κουκίδες.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                insertorderedlist : {
                    title: 'Εισαγωγή Λίστας Α�?ίθμησης',
                    text: 'Ξεκινήστε μια λίστα με α�?ίθμηση.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                createlink : {
                    title: 'Hyperlink',
                    text: 'Μετατ�?έπετε το π�?οεπιλεγμένο κείμενο σε Link.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                sourceedit : {
                    title: 'Επεξε�?γασία Κώδικα',
                    text: 'Μεταβαίνετε στη λειτου�?γία επεξε�?γασίας κώδικα.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                }
            }
        });
    }


    if(exists('Ext.grid.header.Container')){
        Ext.apply(Ext.grid.header.Container.prototype, {
            sortAscText  : "Α�?ξουσα ταξινόμηση",
            sortDescText : "Φθίνουσα ταξινόμηση",
            lockText     : "Κλείδωμα στήλης",
            unlockText   : "Ξεκλείδωμα στήλης",
            columnsText  : "Στήλες"
        });
    }

    if(exists('Ext.grid.GroupingFeature')){
        Ext.apply(Ext.grid.GroupingFeature.prototype, {
            emptyGroupText : '(Καμμία)',
            groupByText    : 'Ομαδοποίηση βάσει αυτο�? του πεδίου',
            showGroupsText : '�?α εμφανίζεται στις ομάδες'
        });
    }

    if(exists('Ext.grid.PropertyColumnModel')){
        Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
            nameText   : "Όνομα",
            valueText  : "Πε�?ιεχόμενο",
            dateFormat : "d/m/Y"
        });
    }

});
