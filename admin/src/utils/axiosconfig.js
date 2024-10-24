const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.refreshToken : ""
    }`,
    Accept: "application/json",
  },
};

export const configForQuickbooks = {
  headers: {
    Authorization: `Bearer eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..W_cUQ3Snl3NhkfN9-zZ4cQ.IMaAIBQebUj0HwnCEHuG6gedfPkqGlcawhGUIkZ522dcMgY0ENiLHLxd9irF6VpcQORI7lVjtev5CMU-m7uFOLqWczRDAqDdda8XUrkgPB8aoq6TRMW3-lOTvfP2UEg6_KBKDOc26qPlrbfyeVBZaJHq6iVHTfhb0VrgsFY5aPT0zH8FEXU9qBrJZgQXM1x6LVM1B6Y9OrVezpoPsnjHnAKytq48ArBfRMBkGpi2b__5sOGipqkfOPT75BiEIASdRpBa7MEROb9a1wPSx0rbOnbSoNwk11_WZ3TS2T-vPgedqqBrZcSRPN58oJxqJOsXmXACQKndMv0HFcluyMX_cOt-d8fD1IbMcRVazovf3kN_QkrDFWN22-vsbni0rV4p64yT6QhIuaPPpWPUxnVF7oyXb8yAB_E-NaiY9K1NFjKJxQ51uyv4wQGfLLWH0aXDfzKbYcQYkSxaP3vD9Bl4W9C2L06YpTJf79xxm4fKtb9Pyoj2unRt74Lc2DIE6Q1HxtwFZ-7NcklTi6XBhFtD-MuwB5eDmxrhMg95SnsoVFMp6HRys2czp3V7hOt85XWJ7tQ5cqFqRpgLiIVPqJCM-wrTwysAgKJckePDnTWwLcwkaO7iL_0cgL6HUgYFka83BR5ICuFAr0vj60msA0HtgO_D30RZG_9q_ty8LQhULKWiLBZVGPZlkicuam2Xigd8BUGxGKDfjLVjP-7RzLSQTufGhR42f5LGlNzvdV8_HqpOUnUm8V9-b1nxwuogPvTO.INUOsUFJ7gDwmsAfONFYsQ`,
    Accept: "application/json",
    ContentType: "application/json",
    AccessControlAllowOrigin: "http://localhost:3001",
    AccessControlAllowCredientials: "true",
  },
};
