from django import template

register = template.Library()


@register.filter(name='mul')
def mul(value, arg):
    value = float(value.replace(',', '.'))
    return float(value) * float(arg)
