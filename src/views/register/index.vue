<template>
  <div class="register-container">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form">
      <h3 class="title">회원가입</h3>

      <el-form-item prop="userId">
        <el-input v-model="registerForm.userId" placeholder="아이디" />
      </el-form-item>

      <el-form-item prop="name">
        <el-input v-model="registerForm.name" placeholder="이름" />
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model="registerForm.password" type="password" placeholder="비밀번호" />
      </el-form-item>

      <el-form-item prop="confirmPassword">
        <el-input v-model="registerForm.confirmPassword" type="password" placeholder="비밀번호 확인" />
      </el-form-item>

      <el-button type="primary" @click="handleRegister">회원가입</el-button>
      <el-button type="text" @click="$router.push('/login')">로그인 페이지</el-button>
    </el-form>
  </div>
</template>

<script>
import { signUp } from '@/api/user'

export default {
  name: 'Register',
  data() {
    return {
      registerForm: {
        userId: '',
        name: '',
        password: '',
        confirmPassword: ''
      },
      registerRules: {
        userId: [{ required: true, message: '아이디를 입력하세요', trigger: 'blur' }],
        name: [{ required: true, message: '이름을 입력하세요', trigger: 'blur' }],
        password: [{ required: true, message: '비밀번호를 입력하세요', trigger: 'blur' }],
        confirmPassword: [{ required: true, message: '비밀번호 확인을 입력하세요', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleRegister() {
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        this.$message.error('비밀번호가 일치하지 않습니다.')
        return
      }
      signUp(this.registerForm).then(() => {
        this.$message.success('회원가입 성공!')
        this.$router.push('/login')
      })
    }
  }
}
</script>
