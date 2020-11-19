from flask_wtf import Form
from wtforms import (
    IntegerField,
    SubmitField,
    RadioField,
    SelectField,
    FieldList,
    StringField,
)
from wtforms import validators, ValidationError


def validate_student(form, field):
    students = list(a.data for a in form.students)
    if students.count(field.data) > 1:
        message = "{} is not distinct".format(field.data)
        raise ValidationError(message)
    return True


def validate_group(form, field):
    groups = list(a.data for a in form.groups)
    if groups.count(field.data) > 1:
        message = "{} is not distinct".format(field.data)
        raise ValidationError(message)
    return True


class PreferenceForm(Form):

    studentChoices = []
    groupChoices = []
    # Get list of students from database ^

    students = FieldList(
        SelectField(
            "Students",
            choices=studentChoices,
            validators=[validate_student],
            coerce=int,
        ),
        min_entries=studentChoices.__len__(),
    )

    groups = FieldList(
        SelectField(
            groupChoices, groupChoices, validators=[validate_group], coerce=int
        ),
        min_entries=groupChoices.__len__(),
    )

    submit = SubmitField("Submit")


def generate_form(students, groups, descriptions):

    student_value = FieldList(
        SelectField(
            "Students", choices=students, validators=[validate_student], coerce=int
        ),
        min_entries=students.__len__(),
    )

    group_value = FieldList(
        SelectField("Groups", choices=groups, validators=[validate_group], coerce=int),
        min_entries=groups.__len__(),
    )

    setattr(PreferenceForm, "students", student_value)
    setattr(PreferenceForm, "groups", group_value)
    setattr(PreferenceForm, "descriptions", descriptions)

    return PreferenceForm()
