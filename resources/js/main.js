$(document).ready(function () {
    $("#calculator-form").on('submit', function (e) {
        e.preventDefault();

        //code here
        var startDate = $('#startDate').val();
        var loanAmount = $('#loanAmount').val();
        var interestRate = $('#interestRate').val();
        var selectedInterval = $('#selectedInterval').val();
        var installmentsNum = $('#installmentsNum').val();

        for (var i = 1; i <= installmentsNum; i++) {
            newDate = new Date(startDate);
            if (selectedInterval == 'daily') {
                newDate.setDate(newDate.getDate() + i);
            }

            else if (selectedInterval == 'weekly') {
                newDate.setDate(newDate.getDate() + (i * 7));
            }

            else if (selectedInterval == 'monthly') {
                newDate.setMonth(newDate.getMonth() + i);
            }

            var dd = newDate.getDate();
            var mm = newDate.getMonth() + 1;
            var y = newDate.getFullYear();
            var newDate = mm + '/' + dd + '/' + y;

            var scheduledPayment = currency(loanAmount).distribute(installmentsNum);
            if (interestRate != 0){
                scheduledPayment[i-1] = currency(scheduledPayment[i-1]).add(currency(scheduledPayment[i-1]).multiply(interestRate));
            }

            var currentBalance = loanAmount - (currency(scheduledPayment[i-1]*i)-scheduledPayment[i-1]);
            var newEndingBalance = loanAmount - (currency(scheduledPayment[i-1]).multiply(i));

            // var currentBalance = currency(loanAmount).subtract(currency(currency(scheduledPayment[i-1]).multiply(i)).add(scheduledPayment[i-1]));
            // var newEndingBalance = currency(loanAmount).subtract(currency(scheduledPayment[i-1]).multiply(i));
            $("#result-table tbody:last-child")
                .append(
                    '<tr><td scope="row">' + i + '</td>' +
                    '<td>' + newDate + '</td>' +
                    '<td>$' + currentBalance.toFixed(2) + '</td>' +
                    '<td>$' + scheduledPayment[i-1] + '</td>' +
                    '<td>' + interestRate + '%</td>' +
                    '<td>$' + newEndingBalance.toFixed(2) + '</td>' +
                    '</tr>');
        }
    });
});