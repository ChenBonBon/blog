<script>
export default {
  data() {
    return {
      password: '',
    };
  },
  watch: {
    password(value) {
      this.$emit('onInput', value);
    },
  },
};
</script>

<template>
  <div class="password-input-container">
    <input
      class="password-input"
      id="passwordInput"
      type="password"
      placeholder="请输入密码"
      v-model="password"
    /><label for="passwordInput">Password</label>
  </div>
</template>

<style scoped>
.password-input-container {
  position: relative;
  width: 100%;
}
.password-input {
  display: inline-block;
  width: 275px;
  padding: 10px 0 10px 15px;
  font-family: 'Open Sans', sans;
  font-weight: 400;
  color: #3eaf7c;
  border: 1px solid #efefef;
  border-radius: 4px;
  outline: 0;
  text-indent: 105px;
  transition: all 0.3s ease-in-out;
  background: #ffffff;
}
.password-input::-webkit-input-placeholder {
  color: #efefef;
  text-indent: 0;
  font-weight: 300;
}
.password-input + label {
  display: inline-block;
  position: absolute;
  transform: translateX(0);
  top: 0;
  left: 0;
  padding: 10px 15px;
  text-shadow: 0 1px 0 rgba(19, 74, 70, 0.4);
  transition: all 0.3s ease-in-out;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  overflow: hidden;
  color: #ffffff;
}
.password-input + label:before,
.password-input + label:after {
  content: '';
  position: absolute;
  right: 0;
  left: 0;
  z-index: -1;
  transition: all 0.3s ease-in-out;
}
.password-input + label:before {
  top: 6px;
  left: 5px;
  right: 5px;
  bottom: 6px;
  background: #3eaf7c;
}
.password-input + label:after {
  top: 0;
  bottom: 0;
  background: #3eaf7c;
}

.password-input:focus,
.password-input:active {
  color: #3eaf7c;
  text-indent: 0;
  background: #fff;
}
.password-input:focus::-webkit-input-placeholder,
.password-input:active::-webkit-input-placeholder {
  color: #aaa;
}
.password-input:focus + label,
.password-input:active + label {
  transform: translateY(-100%);
}
.password-input:focus + label:before,
.password-input:active + label:before {
  border-radius: 5px;
}
.password-input:focus + label:after,
.password-input:active + label:after {
  transform: translateY(100%);
}
</style>
