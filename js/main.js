const arrow = document.querySelector('#calc')
const dia = document.querySelector('#dia')
const mes = document.querySelector('#mes')
const anio = document.querySelector('#anio')
const label = document.querySelectorAll('.fecha label')
const p = document.querySelectorAll('.fecha p')
const dias_cumplidos = document.querySelector('#total_dias')
const meses_cumplidos = document.querySelector('#total_meses')
const anios_cumplidos = document.querySelector('#total_anios')


const valida_datos = (e)=>{
	

	const dias_invalidos = dia.value.length === 0 || dia.value < 0 || dia.value > 31
	const mes_invalido = mes.value.length === 0 || mes.value < 0 || mes.value > 12
	const fecha = new Date();
	const anio_actual = fecha.getFullYear()
	const mes_actual = fecha.getMonth()+1
	const dia_actual = fecha.getDate()
	const anio_invalido = anio.value.length === 0 || anio.value.length < 4 || anio.value > anio_actual

	dia.className = dias_invalidos ? 'invalid' : ''
	label[0].className = dias_invalidos ? 'invalid' : ''
	p[0].className = dias_invalidos ? 'error_date' : 'hide'
	mes.className = mes_invalido ? 'invalid' : ''
	label[1].className = mes_invalido ? 'invalid' : ''
	p[1].className = mes_invalido ? 'error_date' : 'hide'
	anio.className = anio_invalido ? 'invalid' : ''
	label[2].className = anio_invalido ? 'invalid' : ''
	p[2].className = anio_invalido ? 'error_date' : 'hide'

	console.log(p)

	if(!dias_invalidos && !mes_invalido && !anio_invalido){
		const fecha_ingresada = new Date(parseInt(anio.value), parseInt(mes.value)-1, parseInt(dia.value))
		const fecha_valida = (parseInt(mes.value) === fecha_ingresada.getMonth()+1)
		let total_anios
		let total_meses
		let total_dias
		let ultimo_dia
		if(fecha_valida){
			if(mes_actual < parseInt(mes.value)){
				total_anios = anio_actual - parseInt(anio.value)-1			
			}else if(mes_actual == parseInt(mes.value) && dia_actual > parseInt(dia.value)){
				total_anios = anio_actual - parseInt(anio.value)-1
			}else{
				total_anios = anio_actual - parseInt(anio.value)
			}
			
			total_meses = 12- Math.abs((((anio_actual*12)+mes_actual) - ((anio_actual*12)+parseInt(mes.value))))

			ultimo_dia = new Date(parseInt(anio.value), (parseInt(mes.value)), 0);
			ultimo_dia = ultimo_dia.getDate()
			total_dias = (parseInt(dia.value) < dia_actual)?(dia_actual - parseInt(dia.value)):(ultimo_dia - (dia.value - dia_actual))

			dias_cumplidos.innerText = total_dias
			meses_cumplidos.innerText = total_meses
			anios_cumplidos.innerText = total_anios	
		}else{
			dia.className = 'invalid'
			label[0].className = 'invalid'
			p[0].className = 'error_date'
			mes.className = 'invalid'
			label[1].className = 'invalid'
			p[1].className = 'error_date'
			anio.className = 'invalid'
			label[2].className = 'invalid'
			p[2].className = 'error_date'
			console.log('fecha no valida')
		}
		
	}


}

arrow.addEventListener('click', valida_datos)