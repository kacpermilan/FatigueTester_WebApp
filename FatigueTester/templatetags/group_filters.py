from django import template
from django.contrib.auth.models import Group

register = template.Library()


@register.filter(name='group_check')
def group_check(user_groups, group_name):
    return Group.objects.get(name=group_name) in user_groups
