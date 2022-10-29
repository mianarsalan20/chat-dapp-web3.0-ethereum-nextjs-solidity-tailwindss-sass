import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import Link from "next/link";
import { ChatContext } from "../context/ChatContext";

const Search = () => {
  const { setSearchAccount, searchAndAddFriend } = useContext(ChatContext);

  return (
    <div className="search">
      <div className="searchForm">
        <form onSubmit={searchAndAddFriend}>
          <input
            required
            type="text"
            placeholder="Enter Address to Add Friend"
            onChange={(e) => setSearchAccount(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default Search;
