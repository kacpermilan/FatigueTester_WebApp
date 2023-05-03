from django.db import models

# Create your models here.


class ClassesTest(models.Model):
    name_of_class = models.TextField(primary_key=True   )
    type_of_class = models.TextField()
    exam = models.TextField()
    comment = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name_of_class
