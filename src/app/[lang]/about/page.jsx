import React from "react";
import {t} from "@/i18n/i18n";


export default function About({params: {lang}}) {

    return (
        <article className="h-full">
            <section className="min-h-full w-full grid grid-cols-10 gap-x-4 px-10 m-auto">
                <div className="col-span-full md:col-span-3 md:col-start-3 m-auto">
                    <h2 className="text-4xl font-extralight">
                        {t(lang, "about.question")}
                    </h2>
                    <section className="text-gray-500 font-normal text-sm leading-6">
                        <br/>
                        <p>{t(lang, "about.answer_1")}</p>
                        <br/>
                        <br/>
                        <p>{t(lang, "about.answer_2")}</p>
                    </section>
                </div>
                <div className="w-full h-full bg-accent col-span-full md:col-span-3">

                </div>
            </section>
        </article>
    );
}
