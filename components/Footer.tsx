import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <div className="flex justify-between px-10 w-screen py-4 fixed bottom-0 shadow-top ">
      <div>
        Created by <a href="https://github.com/ankur1493">Ankur Sharma</a>
      </div>
      <div className="flex gap-3 justify-around">
        <a href="https://linkedin.com/in/ankursharma14" target="_blank">
          <Linkedin color="white" />
        </a>
        <a href="https://github.com/ankur1493" target="_blank">
          <Github color="white" />
        </a>
        <a href="https://twitter.com/ankursharma1493" target="_blank">
          <Twitter color="white" />
        </a>
      </div>
    </div>
  );
}
