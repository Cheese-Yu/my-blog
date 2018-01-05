<template lang="html">
  <footer>
    <p>Copyrights © 2017 CheeseYu. Inspiration comes from elva2596.</p>
  </footer>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
  footer{
      padding-left: 27%;

      height: 10rem;
    text-align: center;
    display: flex;
    display: -webkit-flex;
  }
  footer p{
    margin:auto;
    font-size: 1.4rem;
    color: #3d3d3d;
    /*padding: 1rem 1.5rem;*/
  }
  @media screen and (max-width:768px){
    footer{
        padding-left: 0;
        height: 6rem;
    }
  }
</style>
