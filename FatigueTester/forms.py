from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from django.utils.translation import gettext_lazy as _


class TranslatedGroupModelChoiceField(forms.ModelChoiceField):
    def label_from_instance(self, obj):
        return _(obj.name)


class RegisterForm(UserCreationForm):
    email = forms.EmailField(label='',
                             widget=forms.TextInput(attrs={'class': 'form-control',
                                                           "placeholder": _('Email Address')}))
    first_name = forms.CharField(label='',
                                 max_length=100,
                                 widget=forms.TextInput(attrs={'class': 'form-control',
                                                               'placeholder': _('First Name')}))
    last_name = forms.CharField(label='',
                                max_length=100,
                                widget=forms.TextInput(attrs={'class': 'form-control',
                                                              'placeholder': _('Last Name')}))
    account_type = TranslatedGroupModelChoiceField(label=_('Account Type'),
                                                   queryset=Group.objects.filter(name__in=['Patient', 'Supervisor']),
                                                   widget=forms.Select(attrs={'class': 'form-control'}))

    def __init__(self, *args, **kwargs):
        super(RegisterForm, self).__init__(*args, **kwargs)

        self.fields['username'].widget.attrs['class'] = 'form-control'
        self.fields['username'].widget.attrs['placeholder'] = _('Username')
        self.fields['username'].label = ''
        self.fields['username'].help_text = _('<span class="form-text text-muted"><small>Required. 150 characters or '
                                              'fewer. Letters, digits and @/./+/-/_ only.</small></span>')

        self.fields['password1'].widget.attrs['class'] = 'form-control'
        self.fields['password1'].widget.attrs['placeholder'] = _('Password')
        self.fields['password1'].label = ''
        self.fields['password1'].help_text = _('<ul class="form-text text-muted small"><li>Your password can\'t be '
                                               'too similar to your other personal information.</li><li>Your password '
                                               'must contain at least 8 characters.</li><li>Your password can\'t be a '
                                               'commonly used password.</li><li>Your password can\'t be entirely '
                                               'numeric.</li></ul>')

        self.fields['password2'].widget.attrs['class'] = 'form-control'
        self.fields['password2'].widget.attrs['placeholder'] = _('Confirm Password')
        self.fields['password2'].label = ''
        self.fields['password2'].help_text = _('<span class="form-text text-muted"><small>Enter the same password as '
                                               'before, for verification.</small></span>')

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2', 'account_type')
