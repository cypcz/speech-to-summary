import { Form as FormikForm, Formik, FormikConfig, FormikValues } from "formik";

type Props<
  Values extends FormikValues = FormikValues,
  ExtraProps = {}
> = FormikConfig<Values> & ExtraProps;

export const Form = <T extends {}>({ children, ...props }: Props<T>) => {
  return (
    <Formik {...props}>
      <FormikForm>{children}</FormikForm>
    </Formik>
  );
};
