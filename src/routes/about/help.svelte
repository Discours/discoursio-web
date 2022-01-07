<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import { fade } from 'svelte/transition'
	import SvelteSeo from 'svelte-seo'
	import LibLoader from '../../components/LibLoader.svelte'
	import Modal from '../../components/Modal.svelte'
	import { openModal } from '../../stores/app';

	let paymentTypeShowing = true
	// let sum = 500
	// let isOnItemPage = true
	// let inputSumrm
	// let inputSum
	// let value = 500
	interface CardData {
		cvv?: string // CVV/CVC код
		cardNumber?: string // Номер карты, наличие пробелов не имеет значения
		expDateMonth?: string // Срок действия карты - месяц
		expDateYear?: string // Срок дейcтвия карты - год
		expDateMonthYear?: string // Срок действия карты, все символы за исключением цифр игнорируются,
		//Если длина строки 2,3 или 5 символов то первая цифра воспринимается как месяц, оставшиеся как год.
		//Если длина строки 4 или 6 символов то первые два трактуются как месяц, а оставшиеся как год.
	}
	const meta = {
		title: 'Поддержите Дискурс',
		description: 'Здесь можно поддержать Дискурс материально.',
		keywords: 'Discours.io, помощь, благотворительность'
	}
	let container: HTMLFormElement
	let amountSwitchElement: HTMLDivElement
	let amount: string | number
	let customAmount
	let checkout
	let card: CardData = {
		cvv: '',
		cardNumber: '',
		expDateMonth: '01',
		expDateYear: '22'
	}
	
	const showCardForm = () => {
		console.log('help: donate clicked')
		$openModal = 'donate'
		let choice: HTMLInputElement = amountSwitchElement.querySelector('input[type=radio]:checked')
		amount = choice.value || customAmount
		console.log('help: input amount ' + amount)
		checkout = new (window as any).cp.Checkout({
			publicId: 'pk_0a37bab30ffc6b77b2f93d65f2aed',
			container,
			description: "Поддержка журнала и развитие Дискурса",
			currency: "RUB",
			amount
		})
		console.log('help: payments initiated')
	}

	const submitCard = () => {
		checkout
			.createPaymentCryptogram(card)
			.then((cryptogram) => {
				console.log(cryptogram)
			})
			.catch((errors) => {
				console.log(errors)
			})
	}
</script>

<SvelteSeo
	{...meta}
	openGraph={{ ...meta, images: [{ url: '/images/donate.jpg' }] }}
/>
<LibLoader src="https://checkout.cloudpayments.ru/checkout.js" />
<article class="container">
	<Modal name="donate">
		<form autocomplete="off" bind:this={container}>
			<input type="text" data-cp="cardNumber" />
			<input type="text" data-cp="expDateMonth" />
			<input type="text" data-cp="expDateYear" />
			<input type="text" data-cp="cvv" />
			<input type="text" data-cp="name" />
			<button type="submit" on:click|preventDefault={submitCard}>Оплатить {amount} р.</button>
		</form>
	</Modal>
	<div class="row">
		<div class="col-md-8 offset-md-2">
			<h1>Как вы&nbsp;можете поддержать Дискурс?</h1>
		</div>
		<div class="col-md-8 col-lg-6 offset-md-3">
			<p>
				Дискурс&nbsp;&mdash; уникальное независимое издание с&nbsp;горизонтальной
				редакцией, существующее в&nbsp;интересах своих читателей. Ваша поддержка
				действительно много значит&nbsp;&mdash; не&nbsp;только для редакции
				Дискурса, но&nbsp;и&nbsp;для сохранения свободной мысли
				и&nbsp;некоммерческого искусства в&nbsp;нашем обществе.
			</p>
			<p>
				Дискурс существует на&nbsp;добровольных началах. Никакой медиахолдинг, фонд
				или государственная структура не&nbsp;финансирует нас&nbsp;&mdash; благодаря
				этому мы&nbsp;можем писать о&nbsp;том, что важно, а&nbsp;не&nbsp;о&nbsp;том,
				что выгодно. Сообщество наших волонтеров ежедневно трудится, чтобы
				рассказывать вам интересные, не&nbsp;освещенные другими изданиями
				истории&nbsp;&mdash; но&nbsp;мы&nbsp;не&nbsp;сможем делать это без вашей
				помощи. Пожертвования читателей составляют основу нашего бюджета
				и&nbsp;позволяют нам существовать.
			</p>
			<p>
				Если вам нравится&nbsp;то, что мы&nbsp;делаем и&nbsp;вы&nbsp;хотите, чтобы
				Дискурс продолжался, пожалуйста, поддержите проект.
			</p>
			<div class="row">
				<div class="col-sm-11 col-md-12">
					<form class="discours-form donate-form" action="" method="post">
						<input type="hidden" name="shopId" value="156465" />
						<input value="148805" name="scid" type="hidden" />
						<input value="0" name="customerNumber" type="hidden" />

						<div class="form-group">
							<div class="donate-buttons-container" bind:this={amountSwitchElement}>
								<input type="radio" name="amount" id="fix250" value="250" />
								<label for="fix250" class="btn donate-value-radio">
									250&thinsp;₽
								</label>
								<input type="radio" name="amount" id="fix500" value="500" checked />
								<label for="fix500" class="btn donate-value-radio">
									500&thinsp;₽
								</label>
								<input type="radio" name="amount" id="fix1000" value="1000" />
								<label for="fix1000" class="btn donate-value-radio">
									1000&thinsp;₽
								</label>
								<input
									class="form-control donate-input"
									required
									value={customAmount}
									type="number"
									name="sum"
									placeholder="Другая сумма"
								/>
							</div>
						</div>

						<div
							class="form-group"
							id="payment-type"
							transition:fade
							class:showing={paymentTypeShowing}
						>
							<div class="btn-group payment-choose" data-toggle="buttons">
								<input
									type="radio"
									autocomplete="off"
									name="rebillingOn"
									value="0"
									id="one-time"
								/>
								<label for="one-time" class="btn payment-type"> Единоразово </label>
								<input
									type="radio"
									autocomplete="off"
									name="rebillingOn"
									id="monthly"
									value="1"
									checked
								/>
								<label for="monthly" class="btn payment-type active">
									Ежемесячно
								</label>
							</div>
						</div>

						<div class="form-group">
							<a href='#donate' class="btn send-btn donate" on:click={() => showCardForm()}
								>Помочь журналу</a
							>
						</div>
					</form>
				</div>
			</div>
			<h3>На&nbsp;что пойдут деньги?</h3>
			<p>
				Ваши пожертвования пойдут на&nbsp;оплату серверов, содержание офиса,
				зарплату редакции и&nbsp;налоги, оплату юридического сопровождения
				и&nbsp;труда бухгалтера, совершенствование сайта, аренду помещения для
				открытой редакции, на&nbsp;печать альманаха Дискурс с&nbsp;лучшими текстами
				авторов за&nbsp;полгода, а&nbsp;также на&nbsp;другие редакционные
				и&nbsp;технические расходы.
			</p>
			<h3>Ваша помощь позволит нам</h3>
			<ul>
				<li>
					<h4>Оставаться бесплатным изданием.</h4>
					<p>
						Мы&nbsp;делаем открытый журнал для всех желающих, а&nbsp;также собираем
						искусство лучших авторов по&nbsp;всему миру. Ваша поддержка позволяет нам
						становиться лучше.
					</p>
				</li>
				<li>
					<h4>Создавать еще больше контента.</h4>
					<p>
						Каждый день к&nbsp;нам присоединяются новые люди, и&nbsp;чем больше нас
						становится, тем больше мы&nbsp;творим и&nbsp;строже оцениваем результаты
						творчества друг друга. В&nbsp;результате повышается и&nbsp;количество,
						и&nbsp;качество контента. Каждый день мы трудимся, чтобы открывать нашим
						читателям новые грани окружающего мира.
					</p>
				</li>
				<li>
					<h4>Развивать форматы и&nbsp;расширять деятельность Дискурса.</h4>
					<p>
						Мы&nbsp;создаем различные спецпроекты и&nbsp;регулярно проводим необычные
						мероприятия. Мы&nbsp;хотим приносить пользу человечеству всеми возможными
						способами.
					</p>
				</li>
				<li>
					<h4>Модернизировать сайт.</h4>
					<p>
						Мы&nbsp;совершенствуем платформу и&nbsp;стараемся сделать проект
						максимально удобным для вас. Мы&nbsp;работаем над мобильной версией, новым
						дизайном, фукционалом, системой регистрации, навигации
						и&nbsp;рекомендаций, которые сделают наше общение еще увлекательней.
					</p>
				</li>
				<li>
					<h4>Выпускать альманах.</h4>
					<p>
						Выпускать раз в&nbsp;полугодие печатный альманах Дискурс
						с&nbsp;33&nbsp;лучшими текстами сайта.
					</p>
				</li>
				<li>
					<h4>Захватить весь мир</h4>
					<p>и&nbsp;принести &laquo;Дискурс&raquo; в&nbsp;каждый дом.</p>
				</li>
			</ul>
			<h3>Войдите в&nbsp;попечительский совет Дискурса</h3>
			<p>
				Вы&nbsp;хотите сделать крупное пожертвование? Станьте попечителем Дискурса
				&mdash;
				<a class="black-link" href="mailto:welcome@discours.io" target="_blank"
					>напишите нам</a
				>, мы&nbsp;будем рады единомышленникам.
			</p>
			<h3>Как ещё можно поддержать Дискурс?</h3>
			<p>
				Есть много других способов поддержать Дискурс и&nbsp;труд наших авторов.
				Например, вы&nbsp;можете периодически рассказывать о&nbsp;проекте своим
				друзьям в&nbsp;соцсетях, делиться хорошими материалами или&nbsp;&mdash; что
				еще лучше&nbsp;&mdash; публиковать свои статьи
				в&nbsp;&laquo;Дискурсе&raquo;. Но&nbsp;главное, что вы&nbsp;можете сделать
				для Дискурса, &mdash; читать нас. Мы&nbsp;вкладываем в&nbsp;журнал душу,
				и&nbsp;внимание каждого читателя убеждает нас в&nbsp;правильности выбранного
				пути. Не&nbsp;переключайтесь.
			</p>
			<p>
				Если вы&nbsp;хотите помочь проекту, но&nbsp;у&nbsp;вас возникли вопросы,
				напишите нам письмо по&nbsp;адресу <a
					class="black-link"
					href="mailto:welcome@discours.io"
					target="_blank">welcome@discours.io</a
				>.
			</p>
		</div>
	</div>
</article>

<style lang="scss">
	:global(input),
	:global(label),
	.btn {
		font-family: 'Muller', Arial, Helvetica, sans-serif;
		border: solid 1px #595959;
		border-radius: 3px;
		font-size: 16px;
		height: 39px;
		line-height: 1.5;
		text-align: center;
	}

	:global(input) {
		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}

		&::placeholder,
		&:focus {
			text-align: center;
			color: #000;
		}

		&:focus {
			&::placeholder {
				opacity: 0;
				transition: opacity 0.2s ease;
			}
			box-shadow: inset 0 0 0 3px #000;
		}

		&:valid,
		&:checked + label {
			box-shadow: inset 0 0 0 3px #000;
			border-color: #000;
			font-weight: 700;
		}

		&[type='number'] {
			-moz-appearance: textfield;
		}

		&[type='radio'] {
			display: none;
		}
	}

	.btn {
		cursor: pointer;
		flex: 1;
		padding: 5px 10px;
		text-align: center;
		white-space: nowrap;

		@include media-breakpoint-down(sm) {
			&:last-of-type {
				margin-right: 0 !important;
			}
		}
	}

	.btn-group {
		input {
			&:first-child + .btn {
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
			}

			&:not(:first-child) + .btn {
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
			}
		}

		.payment-type {
			width: 50%;
		}
	}

	.donate-buttons-container {
		display: flex;
		flex: 1;
		justify-content: space-between;

		@include media-breakpoint-down(sm) {
			flex-wrap: wrap;
		}

		input,
		label {
			margin: 0 8px;

			@include media-breakpoint-down(sm) {
				margin-bottom: 1em;
			}
		}

		input {
			&:first-child,
			&:first-child + label {
				margin-left: 0;
			}

			&:last-child,
			&:last-child + label {
				margin-right: 0;
			}
		}
	}

	.donate-input {
		@include media-breakpoint-down(sm) {
			flex: 1 100%;
			margin: 0 !important;
		}
	}

	.send-btn {
		font-weight: 700;
		color: #fff;
		border: 1px solid #000;
		background-color: #000;
		line-height: 1;
		letter-spacing: 0.05em;
		width: 100%;
		text-transform: uppercase;
	}

	.payment-choose {
		display: flex;
	}

	.form-group:not(:first-child) {
		margin-top: 20px;
	}
</style>
