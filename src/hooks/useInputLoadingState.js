import React from "react";
import { useState } from "react";

const useInputLoadingState = () => {
  const [searchInput, setSearchInput] = useState("");
  // Loading.js
  const [isLoading, setIsLoading] = useState(false);

  return { searchInput, setSearchInput, isLoading, setIsLoading };
};

export default useInputLoadingState;
