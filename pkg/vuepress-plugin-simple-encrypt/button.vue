<script>
export default {
  props: {
    type: 'primary' | 'default',
  },
  data() {
    return {};
  },
};
</script>

<template>
  <div :class="['button', type]">
    <div data-animation="ripple"><slot></slot></div>
  </div>
</template>

<style scoped>
.button {
  display: inline-block;
  width: 100px;
  height: 32px;
  margin: auto;
  color: #4abf8a;
  background: #fff;
}
.button.primary {
  background: #4abf8a;
  color: #fff;
}
*[data-animation='ripple'] {
  height: 100%;
  width: 100%;
  color: inherit;
  background: inherit;
  display: block;
  outline: none;
  padding: 0;
  text-transform: uppercase;
  box-sizing: border-box;
  text-align: center;
  line-height: 32px;
  font-family: roboto, helvetica;
  font-weight: 200;
  letter-spacing: 1px;
  text-decoration: none;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  border-radius: 4px;
}

.button *[data-animation='ripple']:hover {
  background: #f9f9f9;
}

.button.primary *[data-animation='ripple']:hover {
  background: #3eaf7c;
}

*[data-animation='ripple']:focus {
  outline: none;
}

*[data-animation='ripple']::selection {
  background: transparent;
  pointer-events: none;
}
</style>
