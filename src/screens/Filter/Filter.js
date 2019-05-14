import React from 'react';
import styled from 'styled-components';
import {Row as RowNative, Grid, Col as ColNative} from 'react-native-easy-grid';
import {Content as ContentNative, Container} from 'native-base';
import {Formik} from 'formik';
import {func, object, number} from 'prop-types';
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

export const Filter = ({apply, fields, filterCount, clear}) => (
	<Formik
		initialValues={{
			date: fields.date
		}}
		onSubmit={values => apply({...values, type: 'fields'})}
		render={({setFieldValue, values, submitForm}) => (
			<Container>
				<TopBar
					title="Filtre sua busca"
					leftComponent={<BackButton />}
					rightComponent={
						<ClearButton total={filterCount} onPress={() => clear('fields')} />
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
									Selecione a data:
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
									date={values.date}
									hideText={!values.date}
									onDateChange={date => setFieldValue('date', date)}
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

Filter.propTypes = {
	apply: func,
	fields: object,
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

const Col = styled(ColNative)`
	padding-left: 15;
	padding-right: 15;
`;
