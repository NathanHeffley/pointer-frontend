<template>
  <div>
    <span class="block uppercase font-light text-3xl dark:text-gray-300">Results</span>
    <ul v-if="$props.show && (voteResults.length > 0)" class="list-reset my-1">
      <li class="py-1 relative text-2xl" v-for="result in voteResults" :key="result.points" @mouseover="hovering = result.points" @mouseleave="hovering = null">
        <span :class="[ result.highest ? 'bg-blue-500 dark:bg-blue-600' : 'bg-gray-400 dark:bg-gray-500', 'points' ]" v-text="result.points"></span>
        <span class="ml-2 text-gray-700 dark:text-gray-300" v-text="result.votes + ' ' + pluralizedVote(result.votes)"></span>
      </li>
    </ul>
    <span v-else class="block mt-2 font-light text-xl dark:text-gray-300">Waiting...</span>
  </div>
</template>

<script>
export default {
  name: 'VoteResults',
  props: ['votes', 'show'],
  data: function () {
    return {
      hovering: null
    }
  },

  watch: {
    hovering: function (value) {
      this.$emit('hovering', value)
    }
  },

  computed: {
    voteResults: function () {
      let results = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        5: 0,
        8: 0,
        13: 0,
        '?': 0
      }

      this.votes.forEach(function (vote) {
        results[vote]++
      })

      let points = Object.keys(results).filter(function (key) {
        return results[key] > 0
      })

      let finalResults = []
      points.forEach(function (point) {
        finalResults.push({
          points: point,
          votes: results[point],
          highest: false
        })
      })

      finalResults.sort(function (a, b) {
        if (a.votes < b.votes) {
          return -1
        }
        if (a.votes > b.votes) {
          return 1
        }

        return 0
      })

      if (finalResults.length > 0) {
        finalResults[finalResults.length - 1].highest = true
      }

      return finalResults
    }
  },

  methods: {
    pluralizedVote: function (votes) {
      if (votes === 1) {
        return 'vote'
      } else {
        return 'votes'
      }
    }
  }
}
</script>
