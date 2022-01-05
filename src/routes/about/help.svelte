<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import { fade } from 'svelte/transition'
	import SvelteSeo from 'svelte-seo'

	let paymentTypeShowing = true
	// let sum = 500
	// let isOnItemPage = true
	// let inputSumrm
	// let inputSum
	// let value = 500

	const clickDonate = async () => {
		console.log('help: donate clicked')
	}

	const meta = {
		title: 'Поддержите Дискурс',
		description: 'Здесь можно поддержать Дискурс материально.',
		keywords: 'Discours.io, помощь, благотворительность'
	}
</script>

<SvelteSeo
	{...meta}
	openGraph={{ ...meta, images: [{ url: '/images/donate.jpg' }] }}
/>
<div class="container">
	<div class="row">
		<div class="col-sm-6">
			<h1 class="h2 black-bg-heading margin-top-100px">
				<span>Как вы можете поддержать Дискурс?</span>
			</h1>
		</div>
		<div class="col-sm-6 margin-top-30px help-us">
			<h4 class="black-bg-heading normal margin-bottom-30px">
				<span>Дискурс —</span>
			</h4>
			<p>
				уникальное независимое издание с горизонтальной редакцией, существующее в
				интересах своих читателей. Ваша поддержка действительно много значит – не
				только для редакции Дискурса, но и для сохранения свободной мысли и
				некоммерческого искусства в нашем обществе.
			</p>
			<p>
				Дискурс существует на добровольных началах. Никакой медиахолдинг, фонд или
				государственная структура не финансирует нас – благодаря этому мы можем
				писать о том, что важно, а не о том, что выгодно. Сообщество наших
				волонтеров ежедневно трудится, чтобы рассказывать вам интересные, не
				освещенные другими изданиями истории – но мы не сможем делать это без вашей
				помощи. Пожертвования читателей составляют основу нашего бюджета и позволяют
				нам существовать.
			</p>
			<p>
				Если вам нравится то, что мы делаем и вы хотите, чтобы Дискурс продолжался,
				пожалуйста, поддержите проект.
			</p>
			<div class="row margin-top-50px margin-bottom-50px">
				<!-- <div class="col-sm-9">
					 <form
						 class="discours-form border"
						 action="https://money.yandex.ru/eshop.xml"
						 method="post"
					 >
						 <input type="hidden" name="shopId" value="156465" />
						 <input value="148805" name="scid" type="hidden" />
						 <input value="0" name="customerNumber" type="hidden" />
						 <div class="row form-group">
							 <div class="col-sm-4"><label class="small">сумма</label></div>
							 <div class="col-sm-6">
								 <input
									 class="form-control"
									 required
									 name="sum"
									 value="200"
								 />
							 </div>
							 <div class="col-sm-2"><label class="small">руб</label></div>
						 </div>
						 <div class="row form-group">
							 <div class="col-sm-4">
								 <label class="small">способ оплаты</label>
							 </div>
							 <div class="col-sm-8">
								 <div class="btn-group payment-choose" data-toggle="buttons">
									 <label
										 class="btn"
										 on:click={() => paymentTypeShowing = false}
									 >
										 <input
											 type="radio"
											 autocomplete="off"
											 name="paymentType"
											 value="PC"
										 /><img src="/images/money/yandex.svg" alt="Я.Деньги" />
									 </label>
									 <label
										 class="btn active"
										 on:click={ () => paymentTypeShowing = true }
									 >
										 <input
											 type="radio"
											 autocomplete="off"
											 name="paymentType"
											 value="AC"
											 checked
										 /><img
											 src="/images/money/visa_mastercard.svg"
											 alt="С помощью карты"
										 />
									 </label>
								 </div>
							 </div>
						 </div>
						 <div class="row form-group" id="payment-type" transition:fade class:showing={paymentTypeShowing}>
							 <div class="col-sm-4">
								 <label class="small">тип платежа</label>
							 </div>
							 <div class="col-sm-8">
								 <div class="btn-group payment-choose" data-toggle="buttons">
									 <label class="btn">
										 <input
											 type="radio"
											 autocomplete="off"
											 name="rebillingOn"
											 value="0"
										 />Единоразовый
									 </label>
									 <label class="btn active">
										 <input
											 type="radio"
											 autocomplete="off"
											 name="rebillingOn"
											 value="1"
											 checked
										 />Ежемесячный
									 </label>
								 </div>
							 </div>
						 </div>
						 <div class="row form-group">
							 <div class="col-sm-8 col-sm-offset-4">
								 <button class="btn-border">подарить</button>
							 </div>
						 </div>
					 </form>
				 </div>-->
				<div class="col-sm-9">
					<form class="discours-form donate-form" action="" method="post">
						<input type="hidden" name="shopId" value="156465" />
						<input value="148805" name="scid" type="hidden" />
						<input value="0" name="customerNumber" type="hidden" />

						<div class="form-group">
							<div class="donate-buttons-container">
								<input type="radio" name="fixSum" id="fix250" value="250" />
								<label for="fix250" class="btn donate-value-radio">
									250&thinsp;₽
								</label>
								<input type="radio" name="fixSum" id="fix500" value="500" checked />
								<label for="fix500" class="btn donate-value-radio">
									500&thinsp;₽
								</label>
								<input type="radio" name="fixSum" id="fix1000" value="1000" />
								<label for="fix1000" class="btn donate-value-radio">
									1000&thinsp;₽
								</label>
								<input
									class="form-control donate-input"
									required
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
							<button class="btn send-btn donate" on:click|preventDefault={clickDonate}
								>Помочь журналу</button
							>
						</div>
					</form>
				</div>
			</div>
			<h3 class="black-bg-heading bold">На что пойдут деньги?</h3>
			<p class="margin-top-30px">
				Ваши пожертвования пойдут на оплату серверов, содержание офиса, зарплату
				редакции и налоги, оплату юридического сопровождения и труда бухгалтера,
				совершенствование сайта, аренду помещения для открытой редакции, на печать
				альманаха Дискурс с лучшими текстами авторов за полгода, а также на другие
				редакционные и технические расходы.
			</p>
			<h3 class="black-bg-heading bold">Ваша помощь позволит нам</h3>
			<ul class="discours-text-list margin-top-30px">
				<li>
					<h4 class="white-bg-heading">Оставаться бесплатным изданием.</h4>
					<p>
						Мы делаем открытый журнал для всех желающих, а также собираем искусство
						лучших авторов по всему миру. Ваша поддержка позволяет нам становиться
						лучше.
					</p>
				</li>
				<li>
					<h4 class="white-bg-heading">Создавать еще больше контента.</h4>
					<p>
						Каждый день к нам присоединяются новые люди, и чем больше нас становится,
						тем больше мы творим и строже оцениваем результаты творчества друг друга.
						В результате повышается и количество, и качество контента. Каждый день мы
						трудимся, чтобы открывать нашим читателям новые грани окружающего мира.
					</p>
				</li>
				<li>
					<h4 class="white-bg-heading">
						Развивать форматы и расширять деятельность Дискурса.
					</h4>
					<p>
						Мы создаем различные спецпроекты и регулярно проводим необычные
						мероприятия. Мы хотим приносить пользу человечеству всеми возможными
						способами.
					</p>
				</li>
				<li>
					<h4 class="white-bg-heading">Модернизировать сайт.</h4>
					<p>
						Мы совершенствуем платформу и стараемся сделать проект максимально удобным
						для вас. Мы работаем над мобильной версией, новым дизайном, фукционалом,
						системой регистрации, навигации и рекомендаций, которые сделают наше
						общение еще увлекательней.
					</p>
				</li>
				<li>
					<h4 class="white-bg-heading">Выпускать альманах.</h4>
					<p>
						Выпускать раз в полугодие печатный альманах Дискурс с 33 лучшими текстами
						сайта.
					</p>
				</li>
				<li>
					<h4 class="white-bg-heading">Захватить весь мир</h4>
					<p>и принести «Дискурс» в каждый дом.</p>
				</li>
			</ul>
			<h3 class="black-bg-heading bold">
				Войдите в попечительский совет Дискурса
			</h3>
			<p>
				Вы хотите сделать крупное пожертвование? Станьте попечителем Дискурса –
				<a class="black-link" href="mailto:welcome@discours.io" target="_blank"
					>напишите нам</a
				>, мы будем рады единомышленникам.
			</p>
			<h3 class="black-bg-heading bold">Как ещё можно поддержать Дискурс?</h3>
			<p>
				Есть много других способов поддержать Дискурс и труд наших авторов.
				Например, вы можете периодически рассказывать о проекте своим друзьям в
				соцсетях, делиться хорошими материалами или – что еще лучше – публиковать
				свои статьи в «Дискурсе». Но главное, что вы можете сделать для Дискурса, –
				читать нас. Мы вкладываем в журнал душу, и внимание каждого читателя
				убеждает нас в правильности выбранного пути. Не переключайтесь.
			</p>
			<p>
				Если вы хотите помочь проекту, но у вас возникли вопросы, напишите нам
				письмо по адресу <a
					class="black-link"
					href="mailto:welcome@discours.io"
					target="_blank">welcome@discours.io</a
				>.
			</p>
		</div>
	</div>
</div>

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
		text-align: center;
		padding: 5px 10px;
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

		input,
		label {
			margin: 0 8px;
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
