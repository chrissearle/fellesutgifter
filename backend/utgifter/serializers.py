from rest_framework import serializers

from .models import (ExpenseGroup, ExpenseType, Expense, Payment)


class PaymentSerializer(serializers.ModelSerializer):
    amount = serializers.FloatField()

    date = serializers.DateField(source='payment_date')

    class Meta:
        model = Payment
        fields = (
            'date', 'floor', 'amount', 'comments')


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
    date = serializers.DateField(source='expense_date')

    class Meta:
        model = Expense
        fields = ('date', 'floor', 'amount', 'expense_type', 'comments')
