# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-01 17:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('utgifter', '0006_auto_20171201_1803'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='comments',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='payment',
            name='comments',
            field=models.TextField(blank=True, null=True),
        ),
    ]
