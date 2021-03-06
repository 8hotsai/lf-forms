$(document).ready(function () {
    var org_chart = $.parseJSON('[{"id":"id","name":"name","head":"head","parent_id":"0"}]');
    var secretaries = ['IamSec1', 'IamSec2'];

    //load_json_data('BU');

    // make Submitter, Division Head, Hiring manager data field readonly
    // to resolve problem that value not saved when submitting form
    ////////////////////////////////////////////////////////////////////
    // $('#q55 input').prop("readonly", true);
    $('#q59 input').prop("readonly", true);
    $('#q13 input').prop("readonly", true);

    // check if current user is secretary
    if ($.inArray($('#q55 input').val(), secretaries) === -1) {
        $('#q56 input').val(0);  // isSecretary = 0
    } else {
        $('#q56 input').val(1);  // isSecretary = 1
    }

    // function to perform dynamic lookup for user choosen Division & Department
    /////////////////////////////////////////////////////////////////////////////
    function load_json_data(id, parent_id) {
        var id_mapping = { "BU": "57", "Division": "40", "Division Head": "25", "Department": "58", "Hiring Manager": "13" };
        var html_code = '';
        var return_value = '';

        html_code += '<option value="">Select ' + id + '</option>';
        $.each(org_chart, function (key, value) {
            if (id === 'BU') {
                if (value.parent_id === '0') {
                    html_code += '<option value="' + value.id + '">' + value.name + '</option>';
                }
            }
            else {
                if (value.parent_id === parent_id) {
                    html_code += '<option value="' + value.id + '">' + value.name + '</option>';
                }
                if (value.id === parent_id) {
                    return_value = value.head;
                }
            }
        });
        $('#Field' + id_mapping[id]).html(html_code);
        return return_value;
    }

    // BU on change
    $('#q57').change(function () {
        //var id_mapping = {"BU":"57", "Division":"40", "Division Head":"59", "Department":"58","Hiring Manager":"13"};
        var bu_id = $('#Field57').val();
        if (bu_id != '') {
            load_json_data('Division', bu_id);
            // clear Division Head, Department, Hiring Manager
            $('#q59 input').val('');
            $('#Field58').html('<option value="">Select Department</option>');
            $('#q13 input').val('');
        }
        else {
            // clear Division, Division Head, Department, Hiring Manager
            $('#Field40').html('<option value="">Select Division</option>');
            $('#q59 input').val('');
            $('#Field58').html('<option value="">Select Department</option>');
            $('#q13 input').val('');
        }
    });

    // Division on change
    $('#q40').change(function () {
        //var id_mapping = {"BU":"57", "Division":"40", "Division Head":"59", "Department":"58","Hiring Manager":"13"};
        var division_id = $('#Field40').val();
        if (division_id != '') {
            var dhead = load_json_data('Department', division_id);
            // set Division Head and clear Hiring Manager
            $('#q59 input').val(dhead);
            $('#q13 input').val('');
        }
        else {
            // clear Division Head, Department, Hiring Manager
            // $('#Field40').html('<option value="">Select Division</option>');
            $('#q59 input').val('');
            $('#Field58').html('<option value="">Select Department</option>');
            $('#q13 input').val('');
        }
    });

    // Department on change
    $('#q58').change(function () {
        //var id_mapping = {"BU":"57", "Division":"40", "Division Head":"59", "Department":"58","Hiring Manager":"13"};
        var department_id = $('#Field58').val();
        if (department_id != '') {
            var dhead = '';
            $.each(org_chart, function (key, value) {
                if (value.id === department_id) {
                    dhead = value.head;
                }
            });

            // show Hiring Manager
            $('#q13 input').val(dhead);
        }
        else {
            // clear Hiring Manager
            $('#q13 input').val('');
        }
    });

    // Testing code, should be comment out when release
    // check if is secretary
    $('#q55').change(function () {
        if ($.inArray($('#q55 input').val(), secretaries) === -1) {
            $('#q56 input').val(0);  // isSecretary = 0
        } else {
            $('#q56 input').val(1);  // isSecretary = 1
        }
    });
});
