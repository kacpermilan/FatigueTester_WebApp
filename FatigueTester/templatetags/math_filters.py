from django import template

register = template.Library()


@register.filter(name='mul')
def mul(value, arg):
    return float(value) * float(arg)
