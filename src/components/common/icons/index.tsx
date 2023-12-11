type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
    logo: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
            <rect width="256" height="256" fill="none" />
            <line
                x1="208"
                y1="128"
                x2="128"
                y2="208"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
            />
            <line
                x1="192"
                y1="40"
                x2="40"
                y2="192"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
            />
        </svg>
    ),
    twitter: (props: IconProps) => (
        <svg
            {...props}
            height="23"
            viewBox="0 0 1200 1227"
            width="23"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
        </svg>
    ),
    gitHub: (props: IconProps) => (
        <svg viewBox="0 0 438.549 438.549" {...props}>
            <path
                fill="currentColor"
                d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
            ></path>
        </svg>
    ),
    gitHubColor: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
            <path
                d="M7.999 0C3.582 0 0 3.596 0 8.032a8.031 8.031 0 0 0 5.472 7.621c.4.074.546-.174.546-.387 0-.191-.007-.696-.011-1.366-2.225.485-2.695-1.077-2.695-1.077-.363-.928-.888-1.175-.888-1.175-.727-.498.054-.488.054-.488.803.057 1.225.828 1.225.828.714 1.227 1.873.873 2.329.667.072-.519.279-.873.508-1.074-1.776-.203-3.644-.892-3.644-3.969 0-.877.312-1.594.824-2.156-.083-.203-.357-1.02.078-2.125 0 0 .672-.216 2.2.823a7.633 7.633 0 0 1 2.003-.27 7.65 7.65 0 0 1 2.003.271c1.527-1.039 2.198-.823 2.198-.823.436 1.106.162 1.922.08 2.125.513.562.822 1.279.822 2.156 0 3.085-1.87 3.764-3.652 3.963.287.248.543.738.543 1.487 0 1.074-.01 1.94-.01 2.203 0 .215.144.465.55.386A8.032 8.032 0 0 0 16 8.032C16 3.596 12.418 0 7.999 0z"></path>
        </svg>
    ),
    radix: (props: IconProps) => (
        <svg viewBox="0 0 25 25" fill="none" {...props}>
            <path
                d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"
                fill="currentcolor"
            ></path>
            <path d="M12 0H4V8H12V0Z" fill="currentcolor"></path>
            <path
                d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"
                fill="currentcolor"
            ></path>
        </svg>
    ),
    aria: (props: IconProps) => (
        <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248zm15.116 0h-8.884L24 22.624Z" />
        </svg>
    ),
    npm: (props: IconProps) => (
        <svg viewBox="0 0 24 24" {...props}>
            <path
                d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"
                fill="currentColor"
            />
        </svg>
    ),
    yarn: (props: IconProps) => (
        <svg viewBox="0 0 24 24" {...props}>
            <path
                d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm.768 4.105c.183 0 .363.053.525.157.125.083.287.185.755 1.154.31-.088.468-.042.551-.019.204.056.366.19.463.375.477.917.542 2.553.334 3.605-.241 1.232-.755 2.029-1.131 2.576.324.329.778.899 1.117 1.825.278.774.31 1.478.273 2.015a5.51 5.51 0 0 0 .602-.329c.593-.366 1.487-.917 2.553-.931.714-.009 1.269.445 1.353 1.103a1.23 1.23 0 0 1-.945 1.362c-.649.158-.95.278-1.821.843-1.232.797-2.539 1.242-3.012 1.39a1.686 1.686 0 0 1-.704.343c-.737.181-3.266.315-3.466.315h-.046c-.783 0-1.214-.241-1.45-.491-.658.329-1.51.19-2.122-.134a1.078 1.078 0 0 1-.58-1.153 1.243 1.243 0 0 1-.153-.195c-.162-.25-.528-.936-.454-1.946.056-.723.556-1.367.88-1.71a5.522 5.522 0 0 1 .408-2.256c.306-.727.885-1.348 1.32-1.737-.32-.537-.644-1.367-.329-2.21.227-.602.412-.936.82-1.08h-.005c.199-.074.389-.153.486-.259a3.418 3.418 0 0 1 2.298-1.103c.037-.093.079-.185.125-.283.31-.658.639-1.029 1.024-1.168a.94.94 0 0 1 .328-.06zm.006.7c-.507.016-1.001 1.519-1.001 1.519s-1.27-.204-2.266.871c-.199.218-.468.334-.746.44-.079.028-.176.023-.417.672-.371.991.625 2.094.625 2.094s-1.186.839-1.626 1.881c-.486 1.144-.338 2.261-.338 2.261s-.843.732-.899 1.487c-.051.663.139 1.2.343 1.515.227.343.51.176.51.176s-.561.653-.037.931c.477.25 1.283.394 1.71-.037.31-.31.371-1.001.486-1.283.028-.065.12.111.209.199.097.093.264.195.264.195s-.755.324-.445 1.066c.102.246.468.403 1.066.398.222-.005 2.664-.139 3.313-.296.375-.088.505-.283.505-.283s1.566-.431 2.998-1.357c.917-.598 1.293-.76 2.034-.936.612-.148.57-1.098-.241-1.084-.839.009-1.575.44-2.196.825-1.163.718-1.742.672-1.742.672l-.018-.032c-.079-.13.371-1.293-.134-2.678-.547-1.515-1.413-1.881-1.344-1.997.297-.5 1.038-1.297 1.334-2.78.176-.899.13-2.377-.269-3.151-.074-.144-.732.241-.732.241s-.616-1.371-.788-1.483a.271.271 0 0 0-.157-.046z"
                fill="currentColor"
            />
        </svg>
    ),
    pnpm: (props: IconProps) => (
        <svg viewBox="0 0 24 24" {...props}>
            <path
                d="M0 0v7.5h7.5V0zm8.25 0v7.5h7.498V0zm8.25 0v7.5H24V0zM8.25 8.25v7.5h7.498v-7.5zm8.25 0v7.5H24v-7.5zM0 16.5V24h7.5v-7.5zm8.25 0V24h7.498v-7.5zm8.25 0V24H24v-7.5z"
                fill="currentColor"
            />
        </svg>
    ),
    react: (props: IconProps) => (
        <svg viewBox="0 0 24 24" {...props}>
            <path
                d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"
                fill="currentColor"
            />
        </svg>
    ),
    tailwind: (props: IconProps) => (
        <svg viewBox="0 0 24 24" {...props}>
            <path
                d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"
                fill="currentColor"
            />
        </svg>
    ),
    google: (props: IconProps) => (
        <svg role="img" viewBox="0 0 24 24" {...props}>
            <path
                fill="currentColor"
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            />
        </svg>
    ),
    googleColor:(props:IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}
             id="google">
            <path fill="#fbbb00"
                  d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"></path>
            <path fill="#518ef8"
                  d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"></path>
            <path fill="#28b446"
                  d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"></path>
            <path fill="#f14336"
                  d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"></path>
        </svg>
    ),
    apple: (props: IconProps) => (
        <svg role="img" viewBox="0 0 24 24" {...props}>
            <path
                d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                fill="currentColor"
            />
        </svg>
    ),
    paypal: (props: IconProps) => (
        <svg role="img" viewBox="0 0 24 24" {...props}>
            <path
                d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"
                fill="currentColor"
            />
        </svg>
    ),
    spinner: (props: IconProps) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    ),
    authBg: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="524.67004" height="531.39694" className="w-full" {...props}
             viewBox="0 0 524.67004 531.39694"
        >
            <polygon
                points="117.67523 88.74385 113.67523 109.74385 133.61763 115.36589 131.1398 92.94604 117.67523 88.74385"
                fill="#a0616a"/>
            <path
                d="M0,523.44458c0,.66003,.53003,1.19,1.19006,1.19H523.48004c.65997,0,1.19-.52997,1.19-1.19,0-.65997-.53003-1.19-1.19-1.19H1.19006c-.66003,0-1.19006,.53003-1.19006,1.19Z"
                fill="#3f3d56"/>
            <g>
                <path
                    d="M356.03772,238.30865H150.36885c-23.32296,0-42.22995,18.90698-42.22995,42.22995v199.43289c0,23.32291,18.90695,42.22986,42.22986,42.22986h205.66896c23.32297,0,42.22995-18.90698,42.22995-42.22995v-199.43283c0-23.32297-18.90698-42.22995-42.22995-42.22995v.00003Z"
                    fill="#fff"/>
                <path
                    d="M356.03781,523.20093H150.36888c-23.83691,0-43.22998-19.39258-43.22998-43.22949v-199.43262c0-23.83691,19.39307-43.22998,43.22998-43.22998h205.66896c23.83691,0,43.22998,19.39307,43.22998,43.22998v199.43262c0,23.83691-19.39307,43.22949-43.22998,43.22949h-.00003ZM150.36888,239.30882c-22.73438,0-41.22998,18.49562-41.22998,41.23v199.43262c0,22.73438,18.49561,41.22949,41.22998,41.22949h205.66896c22.73438,0,41.22998-18.49512,41.22998-41.22949v-199.43262c0-22.73438-18.49561-41.22998-41.22998-41.22998H150.36888v-.00002Z"
                    fill="#3f3d56"/>
                <path
                    d="M370.93558,324.77005h-82.66788c-3.50635,0-6.35907-2.85272-6.35907-6.35907s2.85272-6.35907,6.35907-6.35907h82.66785c3.50635,0,6.35907,2.85272,6.35907,6.35907s-2.85272,6.35907-6.35907,6.35907h.00003Z"
                    fill="#000000"/>
                <path
                    d="M293.3822,374.77737h-80.3571c-2.02586,0-3.67427-1.64841-3.67427-3.67429s1.64841-3.67352,3.67427-3.67352h80.3571c2.02588,0,3.67352,1.64764,3.67352,3.67352s-1.64764,3.67426-3.67352,3.67426v.00003Z"
                    fill="#000000"/>
                <rect x="133.61763" y="251.96666" width="46.49806" height="5.96129" rx=".31021"
                      ry=".31021" fill="#000000"/>
                <circle cx="334.3363" cy="253.15892" r="4.76904" fill="#3f3d56"/>
                <circle cx="347.45114" cy="253.15892" r="4.76904" fill="#3f3d56"/>
                <circle cx="360.56598" cy="253.15892" r="4.76904" fill="#3f3d56"/>
                <path
                    d="M149.86826,394.44458c0,.66003,.53003,1.19,1.19006,1.19h204.28998c.65997,0,1.19-.52997,1.19-1.19,0-.65997-.53003-1.19-1.19-1.19H151.05832c-.66003,0-1.19006,.53003-1.19006,1.19Z"
                    fill="#3f3d56"/>
            </g>
            <g>
                <path id="uuid-d0b76542-8f08-4363-846d-0cc3b89caf22-176"
                      d="M212.17296,100.91704c4.34915-3.59367,9.72871-4.26258,12.0153-1.49438,2.28658,2.7682,.6142,7.92447-3.73698,11.51883-1.71841,1.45964-3.76141,2.48653-5.95805,2.99474l-18.6198,14.99379-6.8499-8.8877,19.08307-13.83763c.91373-2.06202,2.30807-3.87516,4.06638-5.28765h-.00002Z"
                      fill="#a0616a"/>
                <path
                    d="M104.55261,134.74706c-.00944-.66307-.00322-6.44713,4.27885-10.10294,4.91893-4.1995,11.85979-2.49972,14.29424-1.90355,5.62363,1.37718,6.08482,3.78959,11.36601,6.2683,9.88049,4.63744-2.4994,2.26379,3.37981,.77675,2.03505-.51472,31.31216-2.54515,38.59979-7.03056,14.17354-8.72353,23.83086-14.01349,23.83086-14.01349l6.31322,12.62642s-9.12891,12.69357-21.97707,22.09717c-13.17929,9.64592-19.76894,14.46893-29.78342,16.3324-.8624,.16048-22.0723,3.78188-39.15515-8.98085-3.89654-2.91112-11.03588-8.24498-11.14714-16.06966v.00002Z"
                    fill="#e6e6e6"/>
                <circle cx="124.1365" cy="80.64255" r="21.99265" fill="#a0616a"/>
                <g>
                    <polygon
                        points="296.37473 228.39777 273.72531 205.21346 262.03351 217.40936 278.90814 239.63901 295.64612 241.55336 296.37473 228.39777"
                        fill="#a0616a"/>
                    <path
                        d="M167.04568,184.92191c1.32477,.11008,5.53464,.95349,9.55849-1.26038,2.74614-1.51086,4.15456-3.75739,4.63022-4.4718,5.90138-8.86325,28.55225-22.68449,48.88084-23.53503,4.60358-.1926,7.63374,.34082,10.38795,1.77647,3.90536,2.03574,5.46449,4.95183,10.4203,11.78291,2.71086,3.73663,5.71039,7.25691,8.45392,10.96962,16.06195,21.73621,22.15103,23.4426,21.52869,30.41109-.69049,7.73164-9.02899,15.06697-14.57111,14.22018-2.26965-.34679-3.14862-1.92497-6.181-5.1199-8.89113-9.36768-12.56963-7.63699-18.89978-14.81212-7.39056-8.37709-6.42307-15.32303-10.27892-15.59132-3.57571-.24879-5.09525,5.67668-12.72906,13.54826-3.49306,3.60187-5.98048,5.2542-13.55853,10.51141-29.51064,20.4729-29.98163,21.91164-35.93719,23.54443-2.60568,.71437-21.09953,5.78468-27.68759-2.28407-10.30952-12.62669,14.04588-50.68156,25.98276-49.68979l.00002,.00003Z"
                        fill="#2f2e41"/>
                    <path
                        d="M289.45026,233.63687c1.66577-.74799,3.61353-1.62257,4.24017-3.63382,.42404-1.3609,.17984-3.03893-.69662-4.19846-1.01126-1.33788-2.50809-1.51421-2.44754-1.75092,.09222-.36043,3.63171-.21954,7.51718,1.15395,.73322,.25919,4.0549,1.47292,8.28021,4.77161,3.38531,2.64291,2.92975,3.17274,5.05261,4.69666,6.51636,4.67783,12.62817,.99107,16.15421,5.37796,1.36081,1.69307,1.94122,4.09685,1.36853,6.04048-1.15005,3.90324-6.74286,5.24648-9.7995,5.93997-7.36151,1.6702-12.93347,.30673-18.75162-.67366-19.78659-3.33418-30.9039-.29752-32.39188-4.8815-.28162-.86758,.1759-.7937,1.70154-7.16035,1.50577-6.2838,1.45636-8.00951,2.7388-8.5127,1.93039-.75745,3.22656,2.68803,8.08945,3.86719,4.3093,1.04492,7.86514-.55173,8.94449-1.03639l-.00003-.00002Z"
                        fill="#2f2e41"/>
                </g>
                <g>
                    <polygon
                        points="256.10776 304.24255 250.38535 272.34015 233.86249 275.8663 235.34267 303.73599 248.11754 314.71902 256.10776 304.24255"
                        fill="#a0616a"/>
                    <path
                        d="M173.50761,195.64528c1.03436,.83499,4.04422,3.89687,8.61693,4.32455,3.1207,.29189,5.54761-.77612,6.34238-1.10016,9.86015-4.02007,36.36378-2.73717,53.66232,7.97432,3.91739,2.4257,6.12517,4.56865,7.59796,7.30318,2.08836,3.87749,1.74097,7.16592,2.00574,15.60118,.14485,4.61414,.65005,9.21133,.83536,13.82404,1.08478,27.00504,5.16501,31.83624,.73697,37.25284-4.91296,6.0098-15.93172,7.39706-20.04204,3.58429-1.6833-1.56143-1.52438-3.3609-2.23946-7.70731-2.09668-12.74399-6.1123-13.37756-7.32111-22.86923-1.41129-11.08171,3.28967-16.28586,.2498-18.67307-2.81902-2.21375-7.40373,1.83601-18.14053,4.06268-4.91292,1.01889-7.89899,.98932-17.12157,1.08406-35.91492,.369-37.11255,1.29501-42.95737-.69821-2.55722-.87209-20.70715-7.06165-21.62754-17.43758-1.44026-16.23715,40.08189-34.04922,49.40214-26.52557l.00002-.00002Z"
                        fill="#2f2e41"/>
                    <path
                        d="M247.43616,304.6893c1.79837,.31647,3.90115,.68652,5.54907-.62579,1.11507-.88797,1.85529-2.41357,1.78117-3.86517-.08551-1.6749-1.22504-2.66132-1.04201-2.82318,.2787-.24646,3.12833,1.85767,5.57211,5.17599,.46115,.62619,2.52814,3.49573,4.17203,8.5979,1.31711,4.08786,.64261,4.27045,1.54343,6.72348,2.7652,7.52985,9.89267,7.91125,10.34689,13.52118,.17529,2.16507-.69427,4.48001-2.25958,5.76669-3.14343,2.58392-8.52548,.55484-11.44412-.58774-7.02916-2.75177-10.87405-7.00882-15.13779-11.08716-14.50015-13.86978-25.4044-17.59988-24.06155-22.22845,.25415-.87601,.59125-.55798,5.42874-4.96936,4.77454-4.354,5.70271-5.80966,7.04642-5.50592,2.02264,.45724,1.1604,4.03604,4.52206,7.74243,2.97899,3.28445,6.81783,3.96005,7.98309,4.1651h.00003Z"
                        fill="#2f2e41"/>
                </g>
                <path
                    d="M127.13487,84.84692c.85618-3.06269-.2192-4.1788,.87688-5.55356,.00002-.00004,.44109-.55322,4.38438-2.04605h0c-1.16344-6.75042-.29231-7.89186-.2923-7.8919,1.00398-1.31553,3.0152-1.63355,4.38438-1.46146,2.89578,.36397,3.40837,2.98166,5.26128,2.92293,2.55962-.08114,5.62956-5.20482,4.67668-9.64566-.77728-3.62247-4.12881-6.31266-4.96896-5.84585-.83301,.46284-3.83173-1.5781-4.96896-1.16917-.77666,.27927-4.43236-.09227-5.26128,.29229-.90523,.41999-3.49763,3.03482-3.74548,2.70535-1.72237-2.28946-1.6857-3.0888-2.68496-3.58223-1.77067-.87434-3.69571,.74172-7.01502,2.33834-6.82959,3.28508-8.8294,1.32549-11.984,4.0921-1.59355,1.39756-2.44808,4.06851-4.0921,9.35336-2.29915,7.39081-3.44871,11.08621-2.33834,14.61463,1.13238,3.59835,2.79995,2.81517,5.26127,7.8919,2.73983,5.65125,1.79552,8.93605,4.38439,10.23024,2.00086,1.00026,5.21638,.36365,6.43044-1.46146,2.07861-3.12477-3.29393-7.35177-1.46146-12.27629,1.12484-3.02287,4.59478-5.31493,6.72273-4.67668,2.40606,.72167,2.58325,5.03573,4.0921,4.96897,1.29207-.05716,2.18914-3.2661,2.33834-3.7998l-.00002-.00002Z"
                    fill="#2f2e41"/>
                <path
                    d="M110.47419,105.89199c4.50049-5.04615,22.83196,.17676,24.55257,8.18419,.7077,3.29357-1.90491,4.68425-1.16917,8.47649,1.0761,5.54668,7.16908,5.16857,11.6917,10.81483,6.42075,8.01601-.19392,15.85188,7.01501,29.22926,1.54044,2.85857,2.83881,5.26787,5.55356,7.59961,6.22958,5.35068,12.02718,3.51566,15.19922,8.47649,2.37209,3.70978,1.39748,8.28224,1.16917,9.35336-.93616,4.39206-3.47342,5.46222-5.26128,9.06107-2.97456,5.98761,.39336,10.38356,.58459,17.53755,.23927,8.95093-4.51735,21.35847-14.03004,25.42946-10.68707,4.57356-23.57658-3.00133-29.81385-10.52254-3.72182-4.48801-4.8022-8.62788-6.43044-13.73775-7.27695-22.8373-11.38807-20.77184-16.95297-38.87492-6.3617-20.69511-7.61233-44.94052,0-52.61267,1.00898-1.01692,3.78571-3.36736,5.55356-7.59961,2.37887-5.69507,.32374-8.55598,2.33834-10.81483h.00003Z"
                    fill="#e6e6e6"/>
                <g>
                    <path id="uuid-35da8825-ceb1-46f8-a8e3-884fcc945dd4-177"
                          d="M176.97331,223.35873c3.48927,4.43333,4.03014,9.82729,1.20837,12.04742-2.82178,2.22012-7.93683,.42567-11.42674-4.0097-1.41838-1.75262-2.39642-3.81944-2.85228-6.02756l-14.54698-18.97093,7.51668-5.73344,14.91145,18.50331c2.03972,.96246,3.81921,2.39954,5.18951,4.1909h-.00002Z"
                          fill="#a0616a"/>
                    <path
                        d="M123.69743,125.12312c.64719-.14454,6.31084-1.31867,10.76347,2.12736,5.11484,3.95855,4.86707,11.10023,4.7802,13.60509-.20073,5.78632-2.46828,6.73006-3.81723,12.40591-2.52377,10.61887,2.28253,20.4873,4.93793,25.93939,.91914,1.88721,3.87206,7.66187,9.75011,13.88094,11.43207,12.09534,21.6324,18.45987,21.6324,18.45987l-10.95802,9.74043s-17.45493-5.32021-29.2823-15.97929c-12.13217-10.93381-30.78935-49.61903-34.65703-59.04257-.33308-.81151,4.38498,12.3821,13.39349-6.94556,2.0548-4.40857,5.81969-12.48606,13.45703-14.19157h-.00005Z"
                        fill="#e6e6e6"/>
                </g>
            </g>
            <g>
                <path id="uuid-ba1531a6-e7ab-4297-b996-1d676f43fe3f-178"
                      d="M273.9451,421.68622c-6.96509,1.06757-12.06003,5.52673-11.37988,9.95923,.68015,4.43253,6.87711,7.15915,13.84454,6.09027,2.78906-.38879,5.44446-1.43985,7.74402-3.06528l29.45425-4.896-1.96582-11.64267-29.38782,4.15851c-2.68179-.86206-5.53104-1.06921-8.30927-.60406h-.00003Z"
                      fill="#ffb6b6"/>
                <polygon
                    points="400.8699 385.39481 389.44897 409.62982 332.03436 428.95758 284.39166 431.49936 283.19855 420.05627 334.83203 409.26022 387.81458 384.22287 400.8699 385.39481"
                    fill="#e6e6e6"/>
                <polygon
                    points="294.97583 477.41565 284.72217 503.35138 271.4527 494.30402 279.29373 467.16196 294.97583 477.41565"
                    fill="#ffb6b6"/>
                <polygon
                    points="252.15169 467.76511 225.00961 493.70087 235.86644 505.16086 263.61166 483.4472 252.15169 467.76511"
                    fill="#ffb6b6"/>
                <polygon
                    points="405.95673 383.32312 405.65515 381.21207 398.71884 367.64105 375.79889 373.67261 380.02097 392.37048 405.95673 383.32312"
                    fill="#ffb6b6"/>
                <path
                    d="M396.30621,473.79669l.70486,9.05923s2.91406,37.98703-20.60907,41.00284-33.77679,6.03156-47.64941-17.49155l-21.71365-38.60205-12.68292,15.09079-16.87177-13.28134s12.06314-47.04623,21.71365-48.85571c1.2063-.22617,2.41263-.33929,3.6001-.36401,7.98938-.16644,15.5206,3.74139,20.30084,10.14508l27.36743,36.66202,9.95209-4.52368,35.88785,11.15842v-.00003Z"
                    fill="#2f2e41"/>
                <path
                    d="M266.02429,502.14508l5.42841-10.25366,15.68207,10.85684s3.61893,13.26944-1.80948,15.07895-20.50735-.60315-20.50735-.60315c0,0-27.74522,6.03156-28.34837,.60315s12.66631-6.63474,12.66631-6.63474l16.8884-9.04736,.00003-.00003Z"
                    fill="#2f2e41"/>
                <path
                    d="M325.13367,494.9072l-41.91943-26.41306-21.41208,19.17517-14.47577-16.8884s26.53891-39.2052,34.37994-41.01468,20.50735-3.01578,20.50735-3.01578l38.60205,35.58627-15.68207,32.5705v-.00003Z"
                    fill="#2f2e41"/>
                <path
                    d="M224.40645,491.28824l13.8726,15.07892-1.82944,1.56488s-3.59898,15.67496-12.04318,10.37241-9.04736-6.50888-9.04736-6.50888c0,0-24.12628,5.42844-26.53891-4.22211s4.22211-7.84103,4.22211-7.84103l6.02444,3.61893,25.33972-12.06314,.00002,.00003Z"
                    fill="#2f2e41"/>
                <circle cx="383.03677" cy="361.00632" r="19.30103" fill="#ffb6b6"/>
                <path
                    d="M378.51309,388.44998l27.74524-8.44421s10.85684,25.33261,9.04736,36.79257c-1.80948,11.45999-18.29459,66.05756-18.29459,66.05756l-36.59271-20.21765s-.60315-12.06314-2.41263-17.49155-7.53946-22.01523,5.12683-35.88785,15.38052-20.80893,15.38052-20.80893l-.00003,.00006Z"
                    fill="#e6e6e6"/>
                <g>
                    <path id="uuid-375aaccb-22f9-42b6-a352-baabb12db8d2-179"
                          d="M317.44769,515.10181c-4.51538,5.40955-5.38428,12.12427-1.9411,14.99738,3.44315,2.87305,9.89352,.81635,14.40979-4.59576,1.83371-2.13715,3.12897-4.68237,3.77734-7.42273l18.84238-23.1622-9.17844-7.42783-19.28064,22.56531c-2.58105,1.12839-4.85428,2.85858-6.62936,5.0459l.00003-.00006Z"
                          fill="#ffb6b6"/>
                    <polygon
                        points="399.79492 400.61868 406.35291 426.59497 374.25586 477.97375 341.48965 510.90475 330.86948 502.09406 363.91479 460.97745 388.96295 407.99997 399.79492 400.61868"
                        fill="#e6e6e6"/>
                </g>
                <path
                    d="M365.24362,357.68896c4.94998-.01184,5.23102,.02112,6.03156,0,6.1395-.1619,7.74496-2.57733,10.85684-2.41263,5.55417,.29398-1.77649,28.14084-4.82526,41.01468-2.99002,12.62589,7.11493,23.9397,7.84103,24.72943,10.25668,11.15479,28.27277,13.19449,31.36417,8.44421,2.50223-3.84491-6.36569-9.69107-4.22211-18.0947,2.09543-8.21484,11.77112-7.34009,14.47577-15.07892,2.83246-8.10455-6.68613-12.19214-12.66629-31.96732-3.43442-11.35699-2.82687-13.47311-6.03156-20.50732-8.56613-18.80209-50.55359-10.79666-45.83994,6.63474,.9118,3.37189-1.51474,7.24872,3.01578,7.23788v-.00006Z"
                    fill="#2f2e41"/>
            </g>
            <g>
                <path
                    d="M426.8764,128.56088H224.02585c-5.7366,0-10.4035-4.66732-10.4035-10.4035V10.4035c0-5.73617,4.6669-10.4035,10.4035-10.4035h202.85056c5.7366,0,10.4035,4.66732,10.4035,10.4035V118.15739c0,5.73617-4.6669,10.4035-10.4035,10.4035Z"
                    fill="#fff"/>
                <path
                    d="M426.8764,128.56088H224.02585c-5.7366,0-10.4035-4.66732-10.4035-10.4035V10.4035c0-5.73617,4.6669-10.4035,10.4035-10.4035h202.85056c5.7366,0,10.4035,4.66732,10.4035,10.4035V118.15739c0,5.73617-4.6669,10.4035-10.4035,10.4035ZM224.02585,1.73731c-4.77844,0-8.66618,3.88774-8.66618,8.66619V118.15739c0,4.77845,3.88774,8.66619,8.66618,8.66619h202.85056c4.77844,0,8.6662-3.88774,8.6662-8.66619V10.4035c0-4.77845-3.88773-8.66619-8.6662-8.66619H224.02585Z"
                    fill="#3f3d56"/>
                <circle cx="411.22028" cy="10.42386" r="2.60596" fill="#3f3d56"/>
                <circle cx="418.16949" cy="10.42386" r="2.60596" fill="#3f3d56"/>
                <circle cx="425.11874" cy="10.42386" r="2.60596" fill="#3f3d56"/>
                <path
                    d="M228.38948,52.5536c-.71851,0-1.30298,.58448-1.30298,1.30298,0,.35035,.1353,.67439,.38087,.91361,.2477,.25364,.57217,.38937,.9221,.38937h194.99193c.71851,0,1.30298-.58448,1.30298-1.30298,0-.35035-.13531-.67439-.38089-.91361-.24771-.25364-.57217-.38937-.92209-.38937H228.38948Z"
                    fill="#e6e6e6"/>
                <path
                    d="M399.05911,52.11928v3.47462H228.38948c-.47775,0-.91208-.19113-1.22478-.51253-.32146-.3127-.51253-.74703-.51253-1.22478,0-.95555,.78181-1.73731,1.7373-1.73731h170.66963Z"
                    fill="#000000"/>
                <path
                    d="M421.20978,45.60437h-17.37308c-1.91589,0-3.47461-1.55832-3.47461-3.47462s1.55875-3.47462,3.47461-3.47462h17.37308c1.91589,0,3.47461,1.55832,3.47461,3.47462s-1.55875,3.47462-3.47461,3.47462Z"
                    fill="#e6e6e6"/>
                <path
                    d="M307.41605,27.36262h-77.72357c-1.91588,0-3.47462-1.55832-3.47462-3.47462s1.55875-3.47462,3.47462-3.47462h77.72357c1.91589,0,3.47461,1.55832,3.47461,3.47462s-1.55875,3.47462-3.47461,3.47462Z"
                    fill="#e6e6e6"/>
                <path
                    d="M228.38948,91.64306c-.71851,0-1.30298,.58448-1.30298,1.30298,0,.35035,.1353,.67439,.38087,.91361,.2477,.25364,.57217,.38937,.9221,.38937h194.99193c.71851,0,1.30298-.58448,1.30298-1.30298,0-.35035-.13531-.67439-.38089-.91361-.24771-.25364-.57217-.38937-.92209-.38937H228.38948Z"
                    fill="#e6e6e6"/>
                <path
                    d="M332.1727,91.20873v3.47462h-103.78322c-.47775,0-.91208-.19113-1.22478-.51253-.32146-.3127-.51253-.74703-.51253-1.22478,0-.95555,.78181-1.73731,1.7373-1.73731h103.78322Z"
                    fill="#000000"/>
                <path
                    d="M421.20978,84.69383h-17.37308c-1.91589,0-3.47461-1.55832-3.47461-3.47462s1.55875-3.47462,3.47461-3.47462h17.37308c1.91589,0,3.47461,1.55832,3.47461,3.47462s-1.55875,3.47462-3.47461,3.47462Z"
                    fill="#e6e6e6"/>
            </g>
        </svg>
    ),
}