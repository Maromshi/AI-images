import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import FormField from "../components/FormField";

// For rendering all cards
const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    // ...post - passing all data of the Object to Crad component as props.
    return data.map((post) => <Card key={post._id} {...post} />);
  }
  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        setAllPosts(result.data.reverse());
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue); // update text state

    clearTimeout(searchTimeout);
    const timeout = setTimeout(() => {
      if (searchValue !== "") {
        const filteredPosts = allPosts.filter((post) =>
          post.prompt.toLowerCase().includes(searchValue.toLowerCase())
        );
        setSearchedResults(filteredPosts); // update the posts that filtered
      } else setSearchedResults(null);
    }, 500);
    setSearchTimeout(timeout);
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Browse through a collection of imaginative and visually stunning
          images generated by DALL-E AI
        </p>
      </div>
      <div className="mt-16">
        <FormField
          labelName={"Search Posts"}
          type={"text"}
          name={"text"}
          placeholder={"Search a photo"}
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <Loader />
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for:
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-colds-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title={"No search results found"}
                />
              ) : (
                <RenderCards data={allPosts} title={"No posts found"} />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
