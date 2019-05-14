import React from 'react';
import styled from 'styled-components';
import {Row as RowNative, Grid, Col as ColNative} from 'react-native-easy-grid';
import {Content as ContentNative, Container} from 'native-base';
import {Formik} from 'formik';
import {func, object, number} from 'prop-types';
import * as yup from 'yup';
import {get} from 'lodash';

// Locals
import {
	TopBar,
	BackButton,
	FooterButton,
	ScrollWrapper,
	InputField,
	Text,
	ClearButton
} from '~/commons';

const FilterSchema = yup.object().shape({
	initialDate: yup.string().required('Campo obrigatório'),
	lastDate: yup.string().required('Campo obrigatório')
});

const getFieldError = (touched, errors, field) => {
	return get(touched, field) && get(errors, field);
};

export const FilterPayment = ({apply, payment, filterCount, clear}) => (
	<Formik
		initialValues={{
			initialDate: payment.initialDate,
			lastDate: payment.lastDate
		}}
		validationSchema={FilterSchema}
		onSubmit={values => apply({...values, type: 'payment'})}
		render={({setFieldValue, values, submitForm, touched, errors}) => (
			<Container>
				<TopBar
					title="Filtre sua busca"
					leftComponent={<BackButton />}
					rightComponent={
						<ClearButton total={filterCount} onPress={() => clear('payment')} />
					}
				/>
				<Content>
					<Group>
						<Title weight="bold" inverted size={15}>
							Filtro
						</Title>
						<Row>
							<Col>
								<Text inverted size={15}>
									Selecione a data inicial:
								</Text>
							</Col>
							<Item />
							<Col>
								<InputField
									confirmBtnText="Confirma"
									cancelBtnText="Cancelar"
									locale="pt-br"
									showIcon={false}
									format="DD/MM/YYYY"
									type="date-picker"
									date={values.initialDate}
									hideText={!values.initialDate}
									onDateChange={date => setFieldValue('initialDate', date)}
									handleBlur={() => setFieldTouched('initialDate')}
									validationMessage={getFieldError(
										touched,
										errors,
										'initialDate'
									)}
								/>
							</Col>
						</Row>
						<Separator />
						<Row>
							<Col>
								<Text inverted size={15}>
									Selecione a data final:
								</Text>
							</Col>
							<Item />
							<Col>
								<InputField
									confirmBtnText="Confirma"
									cancelBtnText="Cancelar"
									locale="pt-br"
									showIcon={false}
									format="DD/MM/YYYY"
									type="date-picker"
									date={values.lastDate}
									hideText={!values.lastDate}
									onDateChange={date => setFieldValue('lastDate', date)}
									handleBlur={() => setFieldTouched('lastDate')}
									validationMessage={getFieldError(
										touched,
										errors,
										'initialDate'
									)}
								/>
							</Col>
						</Row>
					</Group>
				</Content>
				<FooterButton onPress={submitForm} textButton="Filtrar" primary />
			</Container>
		)}
	/>
);

FilterPayment.propTypes = {
	apply: func,
	payment: object,
	filterCount: number,
	clear: func
};

const Wrapper = styled.View``;

const Group = styled.View`
	margin-top: 10;
`;

const Title = styled(Text)`
	margin-left: 15;
	margin-bottom: 10;
`;

const Row = styled(RowNative)`
	background-color: ${props => props.theme.secondary};
	justify-content: center;
	align-items: center;
	padding-top: 10;
	padding-bottom: 10;
`;

const Content = styled(ContentNative)`
	background-color: ${props => props.theme.bg};
`;
const Item = styled.View`
	border: 1px solid ${props => props.theme.bg};
	height: 48;
`;

const Separator = styled.View`
	border: 1px solid ${props => props.theme.bg};
	width: 100%;
`;

const Col = styled(ColNative)`
	padding-left: 15;
	padding-right: 15;
`;
