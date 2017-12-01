# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-30 17:24
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('expense_date', models.DateField(verbose_name='expense date')),
                ('floor', models.IntegerField(choices=[(1, 'Første etasje'), (2, 'Annen etasje')], default=1)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=6)),
            ],
        ),
        migrations.CreateModel(
            name='ExpenseGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('first_floor_percent', models.IntegerField(default=50)),
            ],
        ),
        migrations.CreateModel(
            name='ExpenseType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='utgifter.ExpenseGroup')),
            ],
        ),
    ]
