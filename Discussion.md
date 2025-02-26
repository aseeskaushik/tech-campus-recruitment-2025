**# Discussion.md**

## **Solutions Considered**
1. **Reading Entire File:** Simple but not feasible for 1TB logs due to memory constraints.
2. **Line-by-Line Streaming:** Efficient memory usage, processes logs incrementally.
3. **Indexing Logs by Date:** Fast retrieval but requires pre-processing.
4. **Using External Tools:** Very fast but needs setup and maintenance.

## **Final Solution Summary**
We chose **line-by-line streaming** for its **memory efficiency, simplicity, and scalability**.

## **Steps to Run**
1. **Setup Node.js** – Ensure Node.js is installed (`node -v`).
2. **Organize Files** – Place `logs_2024.log` inside `logs2024/`.
3. **Run the Script** – Execute:
   ```sh
   node src/extract_logs.js 2024-12-01
   ```
4. **Check Output** – Extracted logs will be in `output/output_2024-12-01.txt`.

