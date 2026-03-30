export const authService = {
  login: async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    // Simulate successful login for testing
    return { success: true, token: "mock-jwt-token-123456", user: { email } };
  },

  checkEmailExists: async (email) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // For mock, any mock mail is free except admin@mypharma.dz
    return email === 'admin@mypharma.dz';
  },

  registerStart: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, data };
  }
};
