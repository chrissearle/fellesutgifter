# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-30 18:09
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('utgifter', '0002_auto_20171130_1904'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='amount',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]