$(document).ready(function () {
    $("#calculator-form").on('submit', function (e) {
        e.preventDefault();

        $('table tbody tr').each(function () {
                $(this).remove();
        })

        //code here
        var startDate = $('#startDate').val();
        var loanAmount = $('#loanAmount').val();
        var interestRate = $('#interestRate').val();
        var selectedInterval = $('#selectedInterval').val();
        var installmentsNum = $('#installmentsNum').val();

        if (interestRate > 0) {
            var interest = currency(loanAmount).multiply(interestRate);
            loanAmount = currency(loanAmount).add(interest);
        }

        var scheduledPayment = currency(loanAmount).distribute(installmentsNum);

        var currentBalance = [];
        var newEndingBalance = [];

        for (var i = 1; i <= installmentsNum; i++) {
            newDate = new Date(startDate);
            if (selectedInterval == 'daily') {
                newDate.setDate(newDate.getDate() + i);
            } else if (selectedInterval == 'weekly') {
                newDate.setDate(newDate.getDate() + (i * 7));
            } else if (selectedInterval == 'monthly') {
                newDate.setMonth(newDate.getMonth() + i);
            }

            var dd = newDate.getDate();
            var mm = newDate.getMonth() + 1;
            var y = newDate.getFullYear();
            var newDate = mm + '/' + dd + '/' + y;

            var thisCurrentBalance = currency(loanAmount)
            .subtract(currency(currency(scheduledPayment[i - 1])
            .multiply(i))
            .subtract(scheduledPayment[i - 1]));

            var thisNewEndingBalance = currency(loanAmount).subtract(currency(scheduledPayment[i - 1]).multiply(i));

            currentBalance.push(thisCurrentBalance);
            newEndingBalance.push(thisNewEndingBalance);

            if (newEndingBalance[installmentsNum-1] > 0) {
                scheduledPayment[installmentsNum-1] = currency(scheduledPayment[installmentsNum-1]).add(newEndingBalance[installmentsNum-1]);
                newEndingBalance[installmentsNum-1] = currency(currentBalance[installmentsNum-1]).subtract(scheduledPayment[installmentsNum-1]);
            }

            // var currentBalance = currency(loanAmount).subtract(currency(currency(scheduledPayment[i-1]).multiply(i)).add(scheduledPayment[i-1]));
            // var newEndingBalance = currency(loanAmount).subtract(currency(scheduledPayment[i-1]).multiply(i));
            $("#result-table tbody:last-child")
                .append(
                    '<tr><th scope="row">' + i + '</th>' +
                    '<td>' + newDate + '</td>' +
                    '<td>$' + currentBalance[i - 1] + '</td>' +
                    '<td>$' + scheduledPayment[i - 1] + '</td>' +
                    '<td>' + interestRate + '%</td>' +
                    '<td>$' + newEndingBalance[i - 1] + '</td>' +
                    '</tr>');
        }
    });
});