<script lang="ts">
  import ShoutCard from './ShoutCard.svelte'
  import type { Shout } from '$lib/codegen'

  export let shouts: Shout[]
  export let title = 'Интересное'
  export let limit = 4
</script>

<div class="floor floor--9">
  <div class="wide-container row">
    <div class="col-md-4">
      <ul class="top-viewed">
        {#each shouts.slice(1, limit) as shout}
          <li>
            <div>
              <div class="top-viewed__topic">
                <a href="/topic/{shout.mainTopic}">
                  {shout.topics.find((item) => item.slug === shout.mainTopic).title}
                </a>
              </div>
              <div class="top-viewed__shout">
                <a href="/{shout.slug}">
                  <h4>{shout.title}</h4>
                  {#if shout.subtitle}{shout.subtitle}{/if}
                </a>
              </div>
            </div>
          </li>
        {/each}
      </ul>
    </div>
    <div class="col-md-8">
      <ShoutCard shout={shouts[0]} />
    </div>
  </div>
</div>

<style lang="scss">
  .top-viewed {
		counter-reset: item;
		list-style-type: none;
		padding-left: 0;

    a {
      border: none;
    }

		li {
			border-bottom: 1px solid #e1e1e1;
			display: flex;
			margin-bottom: 1.6rem;
			padding-bottom: 1.6rem;

			&:last-child {
				border: none;
			}

			&:before {
				content: counter(item, upper-roman);
				counter-increment: item;
				font-size: 1.4em;
				font-weight: 900;
				line-height: 1;
				padding-right: 0.3em;
				min-width: 2em;
				text-align: center;
				width: 2em;
			}
		}
	}

	.top-viewed__topic {
		font-size: 1.2rem;
		letter-spacing: 0.08em;
		margin-bottom: 0.4rem;
		text-transform: uppercase;
	}

	.top-viewed__shout {
		font-size: 1.4rem;

		h4 {
			display: inline;
			font-size: 1.4rem;
		}
	}
</style>
