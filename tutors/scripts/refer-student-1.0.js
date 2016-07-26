//**************************************************************
//
//  Title: refer-student.js
//
//  Description: Contains client side code for manipluation
//  and validation of the student referral form.
//
//  Language: Javascript and JQuery
//
//  Version: 1.0
//
//  Author: Ahmed Kaouri
//
//  Date: 30/11/2012
//  
//  History:
//  25/03/2015 - Updated non-submission, Non-engagement, Concerns
//**************************************************************

var charcount = 750;
var unaware = "rCareers, ralert, rstudyskills, rwithdrawal";
var sbCharTimer = null;
var ParentElements = "";
var childElements = "";
var childOfChildElements = "";
var prevElements = "";
var prevSubElements = "";
var charlimit = 750;

$(document).ready(function () {

    var aware;

    // Switch to monitor if the shared details input box
    // has been enabled by another radio button
    // to prevent it being disabled.
    var detailsBox = false;
    var inhibit2 = false;
    var inhibit3 = false;

    var referralRadios = 'div.refreason div :input[type="radio"]';

    if ($('#studcheck1:checked').val()) {
        $('#studentisaware').addClass('show');
        aware = true;
    }

    if ($('#studcheck2:checked').val()) {
        $('#studentnotaware').addClass('show');

        aware = false;
    }

    // Apply icons to radio buttons
    $(referralRadios).each(function () {
        var wwwIco = ['contactdets', 'rCareers', 'rassnosub', 'rstudyskills', 'rengaged'];
    });

    $('#discon1').change(function () {

        if ($('#discon1:checked').val() && $('#rhealth:checked').val()) {
            charlimit = 700;
        }
        else {
            charlimit = 750;
        }
        charsremaining();
        $('#limit').text(charlimit + " ");

    });

    // Handles Awareness radio buttons
    $('input[name="studcheck"]').change(function () {


        // Clear text box values
        $('#datelastref, #whynotaware').val('');

        ShowHide('#studcheck1', '#studentisaware');
        ShowHide('#studcheck2', '#studentnotaware');

        // Student is aware
        if ($('#studcheck1:checked').val()) {
            aware = true;
        }

        // Student is not aware
        if ($('#studcheck2:checked').val()) {
            aware = false;
        }

        // Check if any options are selected that require an auto response
        // and update message accrodingly.

        if ((typeof $('input[name="referralreason"]:checked') != 'undefined')) {
            var CheckedRefReasonRadioBtn = $('input[name="referralreason"]:checked').attr('id');

            if (unaware.lastIndexOf(CheckedRefReasonRadioBtn) != -1) {
                $('#check1, #check2').attr('checked', false);

                if (!aware) {
                    $('#tbLetter, #tbLetterS').removeClass('show');
                    $('#tbNonLetter, #details').addClass('show');
                }
                else {
                    $('#tbNonLetter, #details').removeClass('show');
                    manage('#ralert', '#h_alert, #tbLetter, #LSF2, #submit');
                    manage('#rCareers', '#h_careerguid, #tbLetter, #LSF7, #submit');
                    manage('#rstudyskills', '#h_studyskills, #tbLetter, #LSF3, #submit');
                    manage('#rwithdraw', '#h_withdrawal, #tbLetterS, #details, #LSF6, #submit');
                }
            }
        }
    });

    // Handles reason for referral radio buttons
    $('input[name="referralreason"]').change(function () {

        var CheckedRefReasonRadioBtn = $('input[name="referralreason"]:checked').val();

        $('#disConfN, #disConfY, #disconf, #health2, #details1i, #details, #details1h, #h_disabilityInfo, #tbLetter, #tbLetterS, #tbNonLetter, #trLetter1, #trLetter2, #assnonsub, #submit').removeClass('show');

        // Reset any selected radio buttons
        $(':input[name="exam"], #rsupport_yes, #rsupport_no, :input[name="disability"], :input[name="disconcern"], :input[name="healthshare"], #check1, #check2').attr('checked', false);

        inhibit2 = false;
        inhibit3 = false;

        // Show preview letter (if any) for selected option.
        //pc.showPreview(CheckedRefReasonRadioBtn);

        if ($('#rwithdraw:checked').val()) {
            $('#sp_inhibit').addClass('hide');
        }
        else {
            $('#sp_inhibit').removeClass('hide');
        }

        // Reset chars count for textarea
        $(':input[name="othercomments"]').val('');

        charsremaining();

        manage('#rdisability', '#h_disability, #disability_disclose');
        manage('#rhealth', '#h_health, #health1');
        manage('#rperscircum', '#h_percirc, #percirc2');
        manage('#contactdets', '#h_contactdet, #tbLetter, #LSF1, #submit');
        manage('#rCareers', '#h_careerguid, #tbLetter, #LSF7, #submit');
        manage('#rnextadvice', '#h_qualification, #MessageK, #details, #submit');
        manage('#ralert', '#h_alert, #tbLetter, #LSF2, #submit');
        manage('#raddsupport', '#h_support, #MessageH, #details, #submit');
        manage('#rassextns', '#h_extensions, #tmaextn2');
        manage('#rassnosub', '#h_assigmentnonsub, #MessageG, #details, #submit');
        manage('#rprogcon', '#h_concerns, #MessageI, #details, #submit');
        manage('#rexamsupp', '#h_examsupport, #MessageJ, #details, #submit');
        manage('#rstudyskills', '#h_studyskills, #tbLetter, #LSF3, #submit');
        manage('#rengaged', '#h_nonengagement, #MessageG, #details, #submit');
        manage('#rwithdraw', '#h_withdrawal, #MessageG, #details, #submit');

        if ($('input[name="referralreason"]:checked').next('img').attr('src') == "css/square.png") {
            $('#sstname').addClass('hide');
        } else {
            $('#sstname').removeClass('hide');
        }

        detailsBox = false;
        inhibit2 = false;
        inhibit3 = false;
    });

    $('input[name="disability"]').change(function () {

        $('#h_disabilityInfo, #details, #disconf, #disConfN, #disConfY, #submit').removeClass('show');

        manage('#rdis1', '#h_disabilityInfo, #details, #submit', true);
        manage('#rdis2', '#disconf', true);
    });

    // Watcher to manage the Auto Response inhibiter
    $('input[name="inhibit2"]').change(function () {
        ShowHide('#check1', '#trLetter1');
        ShowHide('#check1', '#details');
    });

    // Watcher to manage the Auto Response inhibiter
    $('input[name="inhibit3"]').change(function () {
        ShowHide('#check2', '#trLetter2');
    });

    // Watcher to manage the Auto Response inhibiter
    $('input[name="disconcern"]').change(function () {

        $('#disConfY, #disConfN, #details').removeClass('show');

        manage('#discon1', '#disConfY, #details, #submit', true);
        manage('#discon2', '#disConfN, #submit', true);

        if ($('#discon1:checked').val()) {
            $('#note1').addClass('hide');
            //$('#note2').addClass('show');

            $(":input[name='othercomments']").val('This student has told me about a health issue which they currently wish to remain confidential. I am concerned that there are substantial health and safety considerations which override a commitment to confidentiality. [Please add succinct relevant details here]');
        }
        else {
            $('#note1').removeClass('hide');
            //$('#note2').removeClass('show');
        }

    });

    $(':input[name="healthshare"]').change(function () {

        $('#health2, #details, #disconf, #disConfY, #disConfN, #submit').removeClass('show');
        $(':input[name="disconcern"]').attr('checked', false);

        if ($('#rhealth1:checked').val()) {
            $('#health2, #details, #submit').addClass('show');
        }
        else {
            $('#health2, #details').removeClass('show');
        }

        if ($('#rhealth2:checked').val()) {
            $('#disconf').addClass('show');
        }
        else {
            $('#disconf').removeClass('show');
        }
    });

    //Personal Circumstances sub radio buttons
    $(':input[name="percircshare"]').change(function () {

        var submit = false;

        $('#details1h, #details, #disconf, #details1i, #submit').removeClass('show');

        $(':input[name="disconcern"]').attr('checked', false);

        if ($('#percir1:checked').val()) {
            $('#submit, #details1h, #details').addClass('show');
            submit = true;
        }
        else {
            $('#details1h, #details').removeClass('show');
        }

        if ($('#percir2:checked').val()) {
            $('#details1i, #submit').addClass('show');
            submit = true;
        }
        else {
            $('#details1i').removeClass('show');
        }

        if (!submit) {
            $('#submit').removeClass('show');
        }

    });

    // Manages each the displaying and showing of elements
    // based on radio button selection.
    function manage(radioBtnId, elIdList, isSub) {

        if (typeof elIdList == 'undefined') elIdList = "";

        if (typeof isSub == 'undefined') isSub = false;

        var elements = prevElements;

        if ($(radioBtnId + ':checked').val()) {

            if (!isSub || typeof isSub == 'undefined') {
                if (elements.length > 0) {
                    $(elements).each(function () {

                        if (typeof $(this).attr('id') != 'undefined') {
                            if ((($(this).attr('id') == 'details') && detailsBox) ||
                            (($(this).attr('id') == "tbLetter") && !inhibit2) ||
                            (($(this).attr('id') == "tbLetterS") && !inhibit3)) {

                            }
                            else {
                                if ($(this).hasClass('show')) {
                                    $(this).removeClass('show');
                                }
                            }
                        }
                    });
                }
            }

            if (elIdList.length > 0) {
                $(elIdList).each(function () {

                    if ($(this).attr('id') != 'undefined') {

                        // Checks if student is unaware in order to auto-inhibit 
                        if ((unaware.lastIndexOf(radioBtnId.substring(1, radioBtnId.length)) > -1 && !aware) && ($(this).attr('id') == 'tbLetter' || $(this).attr('id') == 'tbLetterS')) {
                            $('#tbNonLetter, #details').addClass('show');
                            $('#check1, #check2').attr('checked', true);
                            detailsBox = true;
                        }
                        else {
                            $(this).addClass('show');
                        }
                    }
                });
            }

            if (!isSub) {
                prevElements = elIdList;
                detailsBox = (elIdList.lastIndexOf("#details") != -1 || (unaware.lastIndexOf(radioBtnId.substring(1, radioBtnId.length)) > -1 && !aware)) ? true : false;
                inhibit2 = (elIdList.lastIndexOf("#tbLetter") != -1) ? true : false;
                inhibit3 = (elIdList.lastIndexOf("#tbLetterS") != -1) ? true : false;
            }
        }
    }

    /*
    * Based on radio button
    * selection this function shows
    * or hides relevant headings
    */
    function ShowHide(radioId, heading) {
        $(radioId + ':checked').val() ? $(heading).addClass("show") : $(heading).removeClass("show");
    }

});

// Calculates chars remaing in textarea
function charsremaining() {
    if (!document.getElementById) return;
    n = charlimit - document.forms["refform"].othercomments.value.length;

    if (n == charcount) return;

    charcount = n;
    s = document.getElementById("spnChars");
    s.removeChild(s.firstChild);
    s.appendChild(document.createTextNode(charcount));
    s.style.color = (charcount < 0) ? '#c00' : '#000';
}

// Validates selection before submitting
function validate() {
    //Check if learner support team is selected
    //    if ($('#selregion').val() == '0') {
    //        alert("Please select a learner support team");
    //        return false;
    //    }

    if (!($(':input[name="studcheck"]:checked').val())) {
        alert('Please select if either the student is aware or not');
        return false;
    }

    // Validation that a value is entered as a date if
    // student is aware.
    if ($('#studcheck1:checked').length > 0) {
        if (!($('#datelastref').val())) {
            alert('Please enter a date of last contact');
            return false;
        }
    }

    // Validate that user has entered a reason if
    // student is unaware of the referral.
    if ($('#studcheck2:checked').val()) {
        if (!($('#whynotaware').val())) {
            alert('Please enter a reason why student is not aware.');
            return false;
        }
    }

    // Validates exam button
    if ($('#rexamsupp:checked').val()) {

        var result = false;

        $(':input[name="exam"]:checked').each(

            function (i) {
                if (($(this).val())) {
                    result = true;
                }
            }
        );

        if (!result) {
            alert('Please tick the relevant box to indicate the nature of the referral.');
            return result;
        }

    }

    if ($('#check1:checked, #check2:checked').val()) {
        if (!$(':input[name="othercomments"]').val() && !($('#tbNonLetter').hasClass('show'))) {
            alert('Please enter a reason why the auto response is inhibited.');
            return false;
        }
    }

    if ($('#raddsupport:checked').val()) {
        if (!($('#rsupport_yes:checked, #rsupport_no:checked').val())) {
            alert('Please indicate if you are able to provide the session.');
            return false;
        }
    }

    // Validate if user has entered referral details.

    if ($('#rhealth1:checked,' +
    '#rnextadvice:checked, #raddsupport:checked, #rassextns:checked,' +
    '#rprogcon:checked, #rexamsupp:checked, #rengaged:checked, #rwithdraw:checked, #discon1:checked, #percir1:checked').val()) {
        if (!($(':input[name="othercomments"]').val())) {

            alert('Please enter a statement for the referral.');
            return false;
        }
    }

    // Handle diablity willing to share

    if ($('#rdis1:checked').val()) {
        if (!($(':input[name="othercomments"]').val())) {

            alert('Please provide the information requested \- the name of the disability and how it affects the student\'s ability to study.');
            return false;
        }
    }


    // Validate if statement is given for
    // auto-inhibited options.
    if ($('#studcheck2:checked').val()) {

        //alert($('#tbNonLetter, #details').hasClass('show'));

        if ($('#tbNonLetter').hasClass('show')) {
            if (!($(':input[name="othercomments"]').val())) {
                alert('Please enter a statement for the referral.');
                return false;
            }
        }
    }

    if (document.forms["refform"].othercomments.value.length > charlimit) {

        var clength = document.forms["refform"].othercomments.value.length;

        alert('Statement for referral has a length of ' + clength + ' which is over ' + charlimit + ' characters');
        return false;
    }

    // Returns success if all checks are valid.
    return true;
}

//Events

// Handles submit
$('#refform').submit(function () {
    return validate();
});

// Handles chars remaining for textarea
$(':input[name="othercomments"]').keyup(function () {
    charsremaining();
});
