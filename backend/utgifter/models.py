from django.db import models

FLOOR = (
    (1, 'Første etasje'),
    (2, 'Annen etasje'),
)


class ExpenseGroup(models.Model):
    title = models.CharField(max_length=200)
    first_floor_percent = models.IntegerField(
        '1st floor (%)',
        blank=False,
        default=50,
    )

    def __str__(self):
        return self.title


class ExpenseType(models.Model):
    title = models.CharField(max_length=200)
    group = models.ForeignKey(ExpenseGroup, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Expense(models.Model):
    expense_date = models.DateField('expense date')

    floor = models.IntegerField(
        choices=FLOOR,
        default=1,
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=3,
    )

    comments = models.TextField(
        blank=True,
        null=True
    )

    expense_type = models.ForeignKey(ExpenseType, on_delete=models.CASCADE)


class Payment(models.Model):
    payment_date = models.DateField('payment date')

    floor = models.IntegerField(
        choices=FLOOR,
        default=1,
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=3,
    )

    comments = models.TextField(
        blank=True,
        null=True
    )

