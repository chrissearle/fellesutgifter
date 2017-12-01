from rest_framework import serializers

from .models import (ExpenseGroup, ExpenseType, Expense, Payment)


class PaymentSerializer(serializers.ModelSerializer):
    amount = serializers.FloatField()

    class Meta:
        model = Payment
        fields = (
            'payment_date', 'floor', 'amount')


class ExpenseGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseGroup
        fields = (
            'title', 'first_floor_percent',
        )


class ExpenseTypeSerializer(serializers.ModelSerializer):
    group = ExpenseGroupSerializer()

    class Meta:
        model = ExpenseType
        fields = (
            'title', 'group'
        )


class ExpenseSerializer(serializers.ModelSerializer):
    expense_type = ExpenseTypeSerializer()
    amount = serializers.FloatField()

    class Meta:
        model = Expense
        fields = ('expense_date', 'floor', 'amount', 'expense_type')
