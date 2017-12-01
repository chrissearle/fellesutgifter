from rest_framework.response import Response
from rest_framework.views import APIView

from utgifter.serializers import ExpenseGroupSerializer, ExpenseTypeSerializer, ExpenseSerializer, PaymentSerializer
from .models import (ExpenseGroup, ExpenseType, Expense, Payment)


class ExpenseGroupView(APIView):
    def get(self, request):
        groups = ExpenseGroup.objects.all()
        serializer = ExpenseGroupSerializer(groups, many=True)
        return Response(serializer.data)


class ExpenseTypeView(APIView):
    def get(self, request):
        types = ExpenseType.objects.all()
        serializer = ExpenseTypeSerializer(types, many=True)
        return Response(serializer.data)


class ExpenseView(APIView):
    def get(self, request):
        expenses = Expense.objects.all()
        serializer = ExpenseSerializer(expenses, many=True)
        return Response(serializer.data)


class PaymentView(APIView):
    def get(self, request):
        payments = Payment.objects.all()
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)
