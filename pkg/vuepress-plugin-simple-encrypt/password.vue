<script>
import Button from './button.vue';
import PasswordInput from './password-input.vue';
import { decrypt } from './utils';

export default {
  data() {
    return {
      password: '',
    };
  },
  methods: {
    onInput(value) {
      this.password = value;
    },
    submit() {
      if (this.password === decrypt(sessionStorage.getItem('password'))) {
        const path = sessionStorage.getItem('path');
        if (sessionStorage.getItem('decrypted')) {
          const decrypted = JSON.parse(sessionStorage.getItem('decrypted'));
          decrypted.push(path);
          sessionStorage.setItem('decrypted', JSON.stringify(decrypted));
        } else {
          const decrypted = [];
          decrypted.push(path);
          sessionStorage.setItem('decrypted', JSON.stringify(decrypted));
        }
        sessionStorage.removeItem('password');
        sessionStorage.removeItem('path');

        location.href = path;
      }
    },
  },
  components: { PasswordInput, Button },
};
</script>

<template>
  <div class="password">
    <PasswordInput @onInput="onInput" />
    <div class="controls">
      <Button type="primary" @click="submit">确认</Button>
    </div>
  </div>
</template>

<style scoped>
.password {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 500px;
  flex-wrap: wrap;
}
.controls {
  margin-top: 32px;
}
</style>
<style>
.controls .button + .button {
  margin-left: 32px;
}
</style>
