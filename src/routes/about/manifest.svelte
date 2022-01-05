<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import FeedbackForm from '../../components/FeedbackForm.svelte'
	import SubscribeForm from '../../components/SubscribeForm.svelte'
	import Modal from '../../components/Modal.svelte'
	import SvelteSeo from 'svelte-seo'
	import { openModal } from '../../stores/app'

	const meta = {
		title: 'Манифесит Дискурса',
		description:
			'Манифест Дискурса: принципы и миссия первого журнала с горизонтальной редакцией.',
		keywords: 'Discours.io, журнал, о проекте, манифест, что это?'
	}
</script>

<SvelteSeo
	{...meta}
	openGraph={{
		...meta,
		images: [{ url: '/images/participation.png', width: 1200, height: 630 }]
	}}
/>
<Modal name="feedback"><FeedbackForm /></Modal>
<Modal name="subscribe"><SubscribeForm /></Modal>
<div class="main-content">
	<div class="container open-post margin-top-20px ng-scope">
		<div class="row">
			<div class="col-md-2">
				<h1 class="h2 black-bg-heading black-bg-heading-margin">
					<span>Манифест</span>
				</h1>
			</div>
			<div class="col-md-7 post-body margin-top-100px">
				<p>
					Дискурс&nbsp;— независимый художественно-аналитический журнал
					с&nbsp;горизонтальной редакцией, основанный на&nbsp;принципах свободы
					слова, прямой демократии и&nbsp;совместного редактирования. Дискурс
					создаётся открытым медиасообществом ученых, журналистов, музыкантов,
					писателей, предпринимателей, философов, инженеров, художников
					и&nbsp;специалистов со&nbsp;всего мира, объединившихся, чтобы вместе делать
					общий журнал и&nbsp;объяснять с&nbsp;разных точек зрения мозаичную картину
					современности.
				</p>
				<p>
					Мы&nbsp;пишем о&nbsp;культуре, науке и&nbsp;обществе, рассказываем
					о&nbsp;новых идеях и&nbsp;современном искусстве, публикуем статьи,
					исследования, репортажи, интервью людей, чью прямую речь стоит услышать,
					и&nbsp;работы художников из&nbsp;разных стран&nbsp;— от&nbsp;фильмов
					и&nbsp;музыки до&nbsp;живописи и&nbsp;фотографии. Помогая друг другу делать
					публикации качественнее и&nbsp;общим голосованием выбирая лучшие материалы
					для журнала, мы&nbsp;создаём новую горизонтальную журналистику, чтобы
					честно рассказывать о&nbsp;важном и&nbsp;интересном.
				</p>
				<p>
					Редакция Дискурса открыта для всех: у&nbsp;нас нет цензуры, запретных тем
					и&nbsp;идеологических рамок. Каждый может
					<a href="/create">прислать материал</a>
					в&nbsp;журнал и
					<a href="/guide" target="_blank">присоединиться к&nbsp;редакции</a>.
					Предоставляя трибуну для независимой журналистики и&nbsp;художественных
					проектов, мы&nbsp;помогаем людям рассказывать свои истории так, чтобы они
					были услышаны. Мы&nbsp;убеждены: чем больше голосов будет звучать
					на&nbsp;Дискурсе, тем громче в&nbsp;полифонии мнений
					будет&nbsp;слышна&nbsp;истина.
				</p>
			</div>
		</div>

		<div id="participation" class="margin-bottom-40px margin-top-minus30px" />

		<div class="row">
			<div class="col-sm-2">
				<h2 class="h2 black-bg-heading black-bg-heading-margin">
					<span class="wrapped">Как участвовать в самиздате</span>
				</h2>
			</div>
			<div class="col-md-7 post-body margin-top-100px">
				<p>
					Дискурс создается
					<a href="/guide" target="_blank">открытым сообществом</a> энтузиастов новой
					независимой журналистики. Участвовать в открытой редакции и помогать журналу
					можно следующими способами:
				</p>
				<h3 class="not-left"><b>Предлагать материалы</b></h3>
				<p>
					<a href="/create">Создавайте</a>
					свои статьи и художественные работы — лучшие из них будут опубликованы в журнале.
					Дискурс — некоммерческое издание, авторы публикуются в журнале на общественных
					началах, получая при этом
					<a href="/create/collab" target="_blank">поддержку</a> редакции, право голоса,
					множество других возможностей и&nbsp;читателей по всему миру.
				</p>
				<h3 class="not-left"><b>Поддерживать проект</b></h3>
				<p>
					Дискурс существует на пожертвования читателей. Если вам нравится журнал,
					пожалуйста, <a href="/about/help">поддержите</a> нашу работу. Ваши пожертвования
					пойдут на&nbsp;выпуск новых материалов, оплату серверов,&nbsp;труда программистов,
					дизайнеров и редакторов.
				</p>
				<h3 class="not-left"><b>Сотрудничать с журналом</b></h3>
				<p>
					Мы всегда открыты для сотрудничества и рады единомышленникам. Если вы
					хотите помогать журналу с редактурой, корректурой, иллюстрациями,
					переводами, версткой, подкастами, мероприятиями, фандрайзингом или
					как-то&nbsp;ещё — скорее пишите нам на
					<a href="mailto:welcome@discours.io" target="_blank">welcome@discours.io</a
					>.
				</p>
				<p>
					Если вы представляете некоммерческую организацию и хотите сделать с нами
					совместный проект, получить информационную поддержку или предложить другую
					форму сотрудничества, пишите на
					<a href="mailto:welcome@discours.io" target="_blank">welcome@discours.io</a
					>.
				</p>
				<p>
					Если&nbsp;вы разработчик и хотите
					помогать&nbsp;с&nbsp;развитием&nbsp;платформы, пишите&nbsp;на
					<a href="mailto:services@discours.io" target="_blank"
						>services@discours.io</a
					>
					— будем рады принять вас в нашу IT-команду.
				</p>
				<h3 class="not-left"><b>Как еще можно помочь</b></h3>
				<p>
					Советуйте нас друзьям и знакомым, в том числе тем, кто занимается
					просветительской и творческой деятельностью. Делитесь нашими материалами —
					все наши публикации можно читать и перепечатывать бесплатно. Подпишитесь на
					Дискурс <a href="https://vk.com/discoursio" target="_blank">ВКонтакте</a>,
					в
					<a href="https://facebook.com/discoursio" target="_blank"> Фейсбуке</a>
					и в <a href="https://t.me/discoursio" target="_blank"> Телеграме</a>, а
					также на <a href="#subscribe">рассылку лучших материалов</a>, чтобы не
					пропустить ничего интересного.
				</p>
			</div>
		</div>
		<div id="connection" class="margin-bottom-40px margin-top-minus30px" />
		<div class="row">
			<div class="col-sm-2">
				<h2 class="h2 black-bg-heading black-bg-heading-margin">
					<span class="wrapped">Будем на связи</span>
				</h2>
			</div>
			<div class="col-md-7 post-body margin-top-100px">
				<p>
					Если вы&nbsp;хотите предложить материал, сотрудничать, рассказать
					о&nbsp;проблеме, которую нужно осветить, что-то обсудить или посоветовать,
					пожалуйста, напишите нам через <a
						href="#feedback"
						on:click={() => ($openModal = 'feedback')}>эту форму</a
					>
					или на почту
					<a href="mailto:welcome@discours.io" target="_blank">welcome@discours.io</a
					>. Мы&nbsp;обязательно ответим и&nbsp;постараемся реализовать
					все&nbsp;хорошие&nbsp;задумки.
				</p>
			</div>
		</div>
	</div>
</div>
