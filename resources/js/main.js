$(document).ready(function () {
    $("#calculator-form").on('submit', function (e) {
        e.preventDefault();

        //code here
        var startDate = $('#startDate').val();
        var loanAmount = $('#loanAmount').val();
        var interestRate = $('#interestRate').val();
        var selectedInterval = $('#selectedInterval').val();
        var installmentsNum = $('#installmentsNum').val();

        if (selectedInterval == "daily") {
            for (var i = 1, newEndingBalance = loanAmount; i <= installmentsNum; i++) {
                var newDate = new Date(startDate);
                newDate.setDate(newDate.getDate() + i);

                var dd = newDate.getDate();
                var mm = newDate.getMonth();
                var y = newDate.getFullYear();
                var newDate = mm + '/' + dd + '/' + y;
                console.log(newDate);

                var scheduledPayment = Math.ceil(((loanAmount * interestRate) / installmentsNum) * 100) / 100;
                console.log(scheduledPayment);

                newEndingBalance = loanAmount - (scheduledPayment*i);
                $("#result-table tbody:last-child")
                    .append(
                        '<tr><td scope="row">' + i + '</td>' +
                        '<td>' + newDate + '</td>' +
                        '<td>$' + newEndingBalance + '</td>' +
                        '<td>$' + scheduledPayment + '</td>' +
                        '<td>' + interestRate + '%</td>' +
                        '<td>$' + newEndingBalance + '</td>' +
                        '</tr>');
            }
        }
    });
});