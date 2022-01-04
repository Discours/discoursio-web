<script lang="ts">
	import Icon from './DiscoursIcon.svelte'
	import FeedbackForm from './FeedbackForm.svelte'
	import Modal from './Modal.svelte'
	import SubscribeForm from './SubscribeForm.svelte'

	const FOOTER_LINKS = [
		{
			header: 'О дискурсе',
			items: [
				{
					title: 'Манифест',
					slug: '/manifest'
				},
				{
					title: 'Как устроен Дискурс',
					slug: '/guide'
				},
				{
					title: 'База знаний',
					slug: '/knowledge-base'
				},
				{
					title: 'Правила сообщества',
					slug: '/terms-of-use'
				},
				{
					title: 'Как написать статью',
					slug: '/how-to-write-a-good-article'
				}
			]
		},

		{
			header: 'Участвовать',
			items: [
				{
					title: 'Предложить идею',
					slug: '/#feedback-idea'
				},
				{
					title: 'Стать автором',
					slug: '/create'
				},
				{
					title: 'Поддержать проект',
					slug: '/help'
				},
				{
					title: 'Обратная связь',
					slug: '/#feedback'
				},
				{
					title: 'Сотрудничать с Дискурсом',
					slug:
						'https://docs.google.com/forms/d/e/1FAIpQLSeNNvIzKlXElJtkPkYiXl-jQjlvsL9u4-kpnoRjz1O8Wo40xQ/viewform'
				}
			]
		},

		{
			header: 'Разделы',
			items: [
				{
					title: 'Авторы',
					slug: '/user/list'
				},
				{
					title: 'Темы',
					slug: '/topic'
				},
				{
					title: 'Сообщества',
					slug: '/community'
				},
				{
					title: 'Партнёры',
					slug: '/partners'
				},
				{
					title: 'Спецпроекты',
					slug: '/projects'
				}
			]
		}
	]

	const SOCIAL = [
		{
			name: 'facebook',
			href: 'https://facebook.com/discoursio'
		},
		{
			name: 'vk',
			href: 'https://vk.com/discoursio'
		},
		{
			name: 'twitter',
			href: 'https://twitter.com/discours_io'
		},
		{
			name: 'telegram',
			href: 'https://t.me/discoursio'
		}
	]
</script>

<Modal name="feedback"><FeedbackForm /></Modal>
<Modal name="subscribe"><p>Вы подписаны!</p></Modal>
<footer class="discours-footer">
	<div class="wide-container">
		<div class="row">
			{#each FOOTER_LINKS as group}
				<div class="col-md-3">
					<h5>{group.header}</h5>

					<ul>
						{#each group.items as item}
							<li>
								<a href={item.slug}>{item.title}</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}

			<div class="col-md-3">
				<h5>Подписка</h5>
				<p>Подпишитесь на&nbsp;наши регулярные рассылки.</p>
				<SubscribeForm />
			</div>
		</div>

		<div class="footer-copyright row">
			<div class="col-md-10">
				Независимый журнал о&nbsp;культуре, науке и&nbsp;обществе с&nbsp;открытой
				горизонтальной редакцией. ©&nbsp;Дискурс 2015-2021. <a href="/terms-of-use"
					>Условия&nbsp;использования</a
				>
			</div>
			<div class="footer-copyright__social col-md-2">
				{#each SOCIAL as social}
					<div class="social__item social__item--{social.name}">
						<a href={social.href}>
							<Icon name="{social.name}-white" />
						</a>
					</div>
				{/each}
			</div>
		</div>
	</div>
</footer>

<style lang="scss">
	.discours-footer {
		background: #000;
		color: rgba(255, 255, 255, 0.64);
		@include font-size(1.7rem);
		padding: 2.4rem 0 4.2rem;

		a {
			color: #fff;
		}

		h5 {
			color: #fff;
			margin-bottom: 1.2rem;
		}

		ul {
			list-style: none;
			margin: 0 0 6.4rem;
			padding: 0;

			a {
				color: rgba(255, 255, 255, 0.64);
				transition: color 0.3s;

				&:hover {
					color: #fff;
				}
			}
		}

		li {
			margin-top: 0.8rem;
		}
	}

	.discours-footer__content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: $grid-gutter-width;
	}

	.footer-copyright {
		border-top: 5px solid #404040;
		color: #696969;
		@include font-size(1.5rem);
		padding-top: 1.6rem;
	}

	.footer-copyright__social {
		display: flex;

		:global(.icon) {
			opacity: 0.5;
			transition: 0.3s;

			&:hover {
				opacity: 1;
			}
		}

		:global(img) {
			max-height: 20px;
			max-width: 20px;
			vertical-align: middle;
		}
	}

	.social__item {
		text-align: right;
		width: 25%;
	}

	.social__item--vk {
		:global(img) {
			max-width: 25px;
		}
	}
</style>
