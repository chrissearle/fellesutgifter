# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-01 16:59
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('utgifter', '0004_payment'),
    ]

    operations = [
        migrations.AddField(
            model_name='expense',
            name='comments',
            field=models.TextField(blank=True),
        ),
    ]
