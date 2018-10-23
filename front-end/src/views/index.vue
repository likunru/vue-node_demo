<template>
  <div>
    <layHead></layHead>
    <layLeft></layLeft>
    <layMain></layMain>
  </div>
</template>
<script>
import layHead from '@/components/layHead'
import layLeft from '@/components/layLeft'
import layMain from '@/components/layMain'
export default {
  components: {layHead, layLeft, layMain}
}
</script>
