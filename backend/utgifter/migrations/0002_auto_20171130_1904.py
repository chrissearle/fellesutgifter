# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-30 18:04
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('utgifter', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='expense',
            name='expense_type',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='utgifter.ExpenseType'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='expensegroup',
            name='first_floor_percent',
            field=models.IntegerField(default=50, verbose_name='1st floor (%)'),
        ),
    ]