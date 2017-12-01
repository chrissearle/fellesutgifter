from django.contrib import admin

from utgifter.models import ExpenseGroup, ExpenseType, Expense, Payment


def format_date(date):
    return date.strftime("%d %b %Y")


class ExpenseGroupAdmin(admin.ModelAdmin):
    def second_floor_percent(self, obj):
        return 100 - obj.first_floor_percent

    second_floor_percent.short_description = '2nd floor (%)'

    list_display = ('title', 'first_floor_percent', 'second_floor_percent')


admin.site.register(ExpenseGroup, ExpenseGroupAdmin)


class ExpenseTypeAdmin(admin.ModelAdmin):
    list_display = ('title', 'group',)


admin.site.register(ExpenseType, ExpenseTypeAdmin)


class ExpenseAdmin(admin.ModelAdmin):
    def expense_date_seconds(self, obj):
        return format_date(obj.expense_date)

    expense_date_seconds.admin_order_field = 'expense_date'
    expense_date_seconds.short_description = 'Date'

    list_display = ('expense_date_seconds', 'floor', 'amount', 'expense_type',)

    list_filter = ('expense_date', 'expense_type', 'floor',)


admin.site.register(Expense, ExpenseAdmin)


class PaymentAdmin(admin.ModelAdmin):
    def payment_date_seconds(self, obj):
        return format_date(obj.payment_date)

    payment_date_seconds.admin_order_field = 'payment_date'
    payment_date_seconds.short_description = 'Date'

    list_display = ('payment_date_seconds', 'floor', 'amount',)

    list_filter = ('payment_date', 'floor',)


admin.site.register(Payment, PaymentAdmin)
