<template>
    <section class="w-full max-w-4xl mx-auto px-4 md:mt-16 mt-8 overflow-hidden">
      <article class="content text-sm md:text-base">
        <h1 classz="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white text-center">
        What's this all about?
        </h1>
        <p>
          Splittez is a Tezos blockchain-based software project that enables users to split revenue between multiple participants in a trustless manner.
          Whether you're running a business, managing a community project, or collaborating on a creative endeavor, Splittez offers an efficient solution for revenue splitting.
        </p>
        <blockquote>
         <b>TL;DR:</b> Splittez is a cool Tezos blockchain project that lets you split revenue among people in a trustless way.
          <br>
          It uses smart contracts to handle the distribution of Tezos or FA2/FA1.2 tokens based on predetermined shares.
          <br>
          You can deploy your own Splitters and browse existing.
          <br>
          Just be careful with gas limits and test your Splitters with small amounts first.
          <br>
          Don't send unique NFTs, they can't be split, and stuck in Splitter forever.
          <br>
          Overall, Splittez makes revenue sharing transparent and fair, so give it a try and see the magic happen!
        </blockquote>
        <p>
          At its core, Splittez allows you to create Splitters, which are individual instances of revenue-sharing smart contracts.
          These Splitters store wallet addresses and their corresponding shares, enabling precise and fair distribution of funds.
          Whether you're dealing with Tezos or other FA2 or FA1.2 tokens, Splittez can handle the distribution seamlessly.
        </p>
        <p>
          With Splittez, the process is straightforward. Users can deploy their own Splitters using the Factory contract, defining the shareholders and their respective shares.
          Once deployed, the funds sent to the Splitter can be distributed among the participants according to the predefined allocations.
        </p>
        <p>
          To facilitate interaction with Splitters, Splittez provides a user-friendly website.
          You can browse existing Splitters, initiate revenue distribution, and monitor the status of the distribution process.
          The website acts as a gateway to the Splittez ecosystem, connecting users to the power of decentralized revenue splitting.
        </p>
        <h2>Who made this?</h2>
        <p>
          Splittez is a public good poject and the brainchild of Boris Grit, OG member of the Tezos community and an accomplished developer.
        </p>
        <h2>FAQ</h2>
        <h3>
          Can I distribute tokens other than Tezos?
        </h3>
        <p>
          Yes, Splittez supports both FA2 and FA1.2 tokens, allowing you to distribute various assets.
          Just don't send individual NFTs to Splitter contracts.
        </p>
        <h3>
          What happens if I send NFT to Splitter?
        </h3>
        <p>
          Consider it lost.
          It is important to note that NFTs cannot be split among multiple recipients. Unlike fungible assets such as Tezos or tokens, NFTs are unique and indivisible. Therefore, when an NFT is sent to a Splitter contract, it will remain within the contract indefinitely.
          <br>Since the primary purpose of a Splitter contract is to distribute funds or tokens based on predefined shares, it does not have the capability to split or distribute individual NFTs. The contract is designed to handle divisible assets that can be distributed proportionally among shareholders based on their respective shares.
        </p>
        <h3>
          Can I deploy a Splitter with Smart contract address as shareholder?
        </h3>
        <p>
          Yes. But consider following.
          For successful distribution, it is crucial that the shareholders' contracts have a "default" entrypoint that accepts Tezos.
          If a contract does not accept Tezos or lacks a "default" entrypoint, the distribution will fail and Tezos will stuck in Splitter.
          Ensure that the contracts involved in the Splitter have the necessary functionalities to receive Tezos.
        </p>
        <h3>
          How many shareholders can I have in a Splitter?
        </h3>
        <p>
          While there is no hard limit on the number of shareholders in a Splitter, it is essential to consider the gas usage limit.
          Handling a large number of shareholders in a single distribution transaction may exceed the gas limit, causing the distribution process to fail.
          Use common sense when deciding the number of shareholders, and consider testing with small amounts to ensure a smooth distribution process.
          10 is sensible limit.
        </p>
        <h3>
          My funds are lost, who is responsible?
        </h3>
        <p>
          Splittez is free and non profit project.
          Every effort was made for it to function as intended but no guarantees provided.
          Use it at your own risk. Responsibility is yours only.
        </p>
        <h3>
          Was smart contracts audited?
        </h3>
        <p>
          No. But smart contract code is opensource and you can examine it.
        </p>
        <h2>
          Do's and Don'ts for Using Splittez
        </h2>
        <h3>
          Do's:
        </h3>
        <ol>
          <li>
            Do familiarize yourself with the Splittez website and explore existing Splitters to get a better understanding of how things work.
          </li>
          <li>
            Do deploy your own Splitter using the Splitter Factory if you need to split revenue among multiple participants.
          </li>
          <li>
            Do send Tezos or compatible tokens to your Splitter to accumulate revenue that will be distributed among shareholders.
          </li>
          <li>
            Do initiate revenue distribution when you're ready by clicking the "Distribute" button on the website.
          </li>
          <li>
            Do test with smaller amounts initially to get a sense of the gas fees and optimize your operations accordingly.
          </li>
        </ol>
        <h3>
          Don'ts:
        </h3>
        <ol>
          <li>
            Don't send NFTs to Splitters. They cannot be split among multiple recipients, so avoid this to prevent any complications.
          </li>
          <li>
            Don't rush it. Start with smaller amounts and familiarize yourself with the process and ensure everything works as expected.
          </li>
          <li>
            Don't overlook the gas limits to avoid potential issues during transactions.
          </li>
        </ol>
          <p>
            Remember, Splittez is designed to simplify revenue splitting, but it's important to follow these do's and don'ts to ensure a smooth experience.
            Have fun exploring the possibilities of trustless revenue distribution and enjoy using Splittez!
          </p>
        </article>
    </section>
</template>

<style>
.content:not(:last-child) {
  margin-bottom: 1.5rem;
}
.content li + li {
  margin-top: 0.25em;
}

.content p:not(:last-child),
.content dl:not(:last-child),
.content ol:not(:last-child),
.content ul:not(:last-child),
.content blockquote:not(:last-child),
.content pre:not(:last-child),
.content table:not(:last-child) {
  margin-bottom: 1em;
}

.content h1,
.content h2,
.content h3,
.content h4,
.content h5,
.content h6 {
  font-weight: 600;
  line-height: 1.125;
}

.content h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

.content h1:not(:first-child) {
  margin-top: 1em;
}

.content h2 {
  font-size: 1.75em;
  margin-bottom: 0.5714em;
}

.content h2:not(:first-child) {
  margin-top: 1.1428em;
}

.content h3 {
  font-size: 1.5em;
  margin-bottom: 0.6666em;
}

.content h3:not(:first-child) {
  margin-top: 1.3333em;
}

.content h4 {
  font-size: 1.25em;
  margin-bottom: 0.8em;
}

.content h5 {
  font-size: 1.125em;
  margin-bottom: 0.8888em;
}

.content h6 {
  font-size: 1em;
  margin-bottom: 1em;
}

.content blockquote {
  background-color: whitesmoke;
  border-left: 5px solid #dbdbdb;
  padding: 1.25em 1.5em;
}
.dark .content blockquote {
  background-color: rgb(24, 24, 24);
  border-left: 5px solid #474747;
  padding: 1.25em 1.5em;
}
.content ol {
  list-style-position: outside;
  margin-left: 2em;
  margin-top: 1em;
}

.content ol:not([type]) {
  list-style-type: decimal;
}

.content ol:not([type]).is-lower-alpha {
  list-style-type: lower-alpha;
}

.content ol:not([type]).is-lower-roman {
  list-style-type: lower-roman;
}

.content ol:not([type]).is-upper-alpha {
  list-style-type: upper-alpha;
}

.content ol:not([type]).is-upper-roman {
  list-style-type: upper-roman;
}

.content ul {
  list-style: disc outside;
  margin-left: 2em;
  margin-top: 1em;
}

.content ul ul {
  list-style-type: circle;
  margin-top: 0.5em;
}

.content ul ul ul {
  list-style-type: square;
}

.content dd {
  margin-left: 2em;
}

.content figure {
  margin-left: 2em;
  margin-right: 2em;
  text-align: center;
}

.content figure:not(:first-child) {
  margin-top: 2em;
}

.content figure:not(:last-child) {
  margin-bottom: 2em;
}

.content figure img {
  display: inline-block;
}

.content figure figcaption {
  font-style: italic;
}

.content pre {
  -webkit-overflow-scrolling: touch;
  overflow-x: auto;
  padding: 1.25em 1.5em;
  white-space: pre;
  word-wrap: normal;
}

.content sup,
.content sub {
  font-size: 75%;
}

.content table {
  width: 100%;
}

.content table td,
.content table th {
  border: 1px solid #dbdbdb;
  border-width: 0 0 1px;
  padding: 0.5em 0.75em;
  vertical-align: top;
}

.content table th {
  color: #363636;
}

.content table th:not([align]) {
  text-align: inherit;
}

.content table thead td,
.content table thead th {
  border-width: 0 0 2px;
  color: #363636;
}

.content table tfoot td,
.content table tfoot th {
  border-width: 2px 0 0;
  color: #363636;
}

.content table tbody tr:last-child td,
.content table tbody tr:last-child th {
  border-bottom-width: 0;
}

.content .tabs li + li {
  margin-top: 0;
}

.content.is-small {
  font-size: 0.75rem;
}

.content.is-normal {
  font-size: 1rem;
}

.content.is-medium {
  font-size: 1.25rem;
}

.content.is-large {
  font-size: 1.5rem;
}
</style>
