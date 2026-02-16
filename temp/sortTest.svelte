<script>
	let newString = $state(null);
	let usage = $state("sort");
	let sensitivity = $state("variant");
	let numeric = $state(false);
	let caseFirst = $state("false");
	let collation = $state("default");
	let localeMatcher = $state("best fit");
	let locale = $state(navigator.language);
	let sortedStrings = $state([]);
	let supportedLocales = navigator.languages;
	let supportedCollations = Intl.supportedValuesOf("collation");
	let testStrings = $state([
		"123",
		"12",
		"1",
  "apple",
  "Äpfel",
  "äpfel",
  "APPLE",
  "café",
  "cafe",
  "résumé",
  "resume",
  "naïve",
  "naive",
  "北京",
  "东京",
  "上海",
  "こんにちは",
  "ありがとう",
  "カタカナ",
  "한국어",
  "서울",
  "Москва",
  "Привет",
  "ПРИВЕТ",
  "Ελληνικά",
  "Αθήνα",
  "עברית",
  "שלום",
  "العربية",
  "مرحبا",
  "ñoño",
  "nono",
  "piña",
  "pina",
  "über",
  "uber",
  "groß",
  "gross",
  "Ångström",
  "angstrom",
  "œuvre",
  "oeuvre",
  "Zürich",
  "zurich",
  "São Paulo",
  "Sao Paulo",
  "Müller",
  "Mueller",
  "muller",
  "Ísland",
  "island",
  "Đà Nẵng",
  "Da Nang",
  "Việt Nam",
  "🍎",
  "🍏",
  "😀",
  "😃",
  "🇺🇸",
  "🇫🇷",
  "🏠",
  "1️⃣",
  "2️⃣",
  "👨‍👩‍👧‍👦",
  "🧑🏽‍💻",
  "Ωmega",
  "omega",
  "αβγδ",
  "ΑΒΓΔ",
  "ß",
  "ss",
  "SS",
  "þorn",
  "thorn",
  "Ærø",
  "Aero",
  "Łódź",
  "Lodz",
  "Čeština",
  "Cestina"
]);
	$effect(() => {
		sortedStrings = sortStrings(testStrings);
	});
	// const sortedStrings = $derived(sortStrings(testStrings));

	function sortStrings(ary) {
		const options = {
			usage,
			sensitivity,
			numeric,
			caseFirst: caseFirst === "false" ? false : caseFirst,
			collation,
			localeMatcher
		};
		const collator = new Intl.Collator(locale, options);
		return ary.sort((a, b) => collator.compare(a, b));
	}
</script>

<div class="min-h-screen bg-stone-900 m-0 p-6">
	<div class="max-w-7xl mx-auto">
		<h1 class="text-5xl font-bold text-stone-50 mb-8">Intl Collator Sorting Test</h1>
		
		<div class="grid grid-cols-2 gap-8 h-full">
			<!-- Left Column: Add Item Box and Options -->
			<div class="space-y-6 sticky">
				<!-- Add Item Box -->
				<div class="flex gap-3">
					<input bind:value={newString} class="flex-1 px-4 py-2 bg-stone-700 border border-stone-600 rounded-lg text-stone-50 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-500 transition-all" placeholder="Add a new string to sort..."/>
					<button onclick={() => {testStrings = [...testStrings, newString]; newString = ""}} class="px-6 py-2 bg-stone-600 hover:bg-stone-500 text-stone-50 font-semibold rounded-lg transition-colors shadow-md">
						Add String
					</button>
				</div>

				<!-- Options Panel -->
				<details class="p-6 bg-stone-800 border border-stone-700 rounded-lg shadow-lg group" open>
					<summary class="cursor-pointer text-lg font-semibold text-stone-100 hover:text-stone-50 transition-colors">⚙️ Collation Options</summary>
					<div class="space-y-5 mt-6 pt-6 border-t border-stone-700">
						<div>
							<label for="locale" class="block text-sm font-semibold text-stone-200 mb-1">Locale</label>
							<p class="text-xs text-stone-400 mb-2">The language and region to use for collation rules</p>
							<div class="flex gap-2">
								<input id="locale" bind:value={locale} class="flex-1 px-3 py-2 bg-stone-700 border border-stone-600 rounded-md text-stone-50 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-500 transition-all" placeholder="e.g., en-US, de-DE, ja-JP"/>
								<select onchange={(e) => locale = e.target.value} class="px-3 py-2 bg-stone-700 border border-stone-600 rounded-md text-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-500 transition-all">
									<option>Select...</option>
									{#each supportedLocales as loc}
										<option value={loc} selected={loc === locale}>{loc}</option>
									{/each}
								</select>
							</div>
						</div>
						<div>
							<label for="usage" class="block text-sm font-semibold text-stone-200 mb-1">Usage</label>
							<p class="text-xs text-stone-400 mb-2">Sort for ordering lists, or search for filtering by key</p>
							<select id="usage" bind:value={usage} class="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md text-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-500 transition-all">
								<option value="sort">sort (default)</option>
								<option value="search">search</option>
							</select>
						</div>
						<div>
							<label for="sensitivity" class="block text-sm font-semibold text-stone-200 mb-1">Sensitivity</label>
							<p class="text-xs text-stone-400 mb-2">Which character differences matter: base letters, accents, case, or all variants</p>
							<select id="sensitivity" bind:value={sensitivity} class="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md text-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-500 transition-all">
								<option value="base">base</option>
								<option value="accent">accent</option>
								<option value="case">case</option>
								<option value="variant">variant (default)</option>
							</select>
						</div>
						<div>
							<label for="numeric" class="flex items-center text-sm font-semibold text-stone-200 cursor-pointer hover:text-stone-100 transition-colors mb-1">
								<input id="numeric" type="checkbox" bind:checked={numeric} class="w-4 h-4 rounded bg-stone-700 border border-stone-600 text-stone-400 focus:ring-2 focus:ring-stone-500 cursor-pointer mr-3"/>
								<span>Numeric ({numeric ? "Enabled" : "Disabled (default)"})</span>
							</label>
							<p class="text-xs text-stone-400 ml-7">Treat numeric sequences as numbers (e.g., "1" &lt; "2" &lt; "10")</p>
						</div>
						<div>
							<label for="caseFirst" class="block text-sm font-semibold text-stone-200 mb-1">Case First</label>
							<p class="text-xs text-stone-400 mb-2">Whether uppercase or lowercase letters sort first</p>
							<select id="caseFirst" bind:value={caseFirst} class="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md text-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-500 transition-all">
								<option value="false">false (default - use locale default)</option>
								<option value="upper">upper</option>
								<option value="lower">lower</option>
							</select>
						</div>
						<div>
							<label for="collation" class="block text-sm font-semibold text-stone-200 mb-1">Collation</label>
							<p class="text-xs text-stone-400 mb-2">Variant collation type (emoji, pinyin, stroke, etc.)</p>
							<select id="collation" bind:value={collation} class="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md text-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-500 transition-all">
								{#each supportedCollations as col}
									<option value={col}>{col}</option>
								{/each}
							</select>
						</div>
						<div>
							<label for="localeMatcher" class="block text-sm font-semibold text-stone-200 mb-1">Locale Matcher</label>
							<p class="text-xs text-stone-400 mb-2">Algorithm for matching locales: best fit or exact lookup</p>
							<select id="localeMatcher" bind:value={localeMatcher} class="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md text-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-500 transition-all">
								<option value="best fit">best fit (default)</option>
								<option value="lookup">lookup</option>
							</select>
						</div>
					</div>
				</details>
			</div>

			<!-- Right Column: Sorted Results List -->
			<div class="bg-stone-800 border border-stone-700 rounded-lg shadow-lg overflow-hidden flex flex-col">
				<div class="px-6 py-3 bg-stone-700 border-b border-stone-600">
					<h2 class="text-sm font-semibold text-stone-200">Sorted Results ({sortedStrings.length})</h2>
				</div>
				<ul class="divide-y divide-stone-700 h-fit overflow-y-auto">
					{#each sortedStrings as item, idx}
						<li class="px-6 py-3 text-stone-100 hover:bg-stone-700 transition-colors {idx % 2 === 0 ? 'bg-stone-800' : 'bg-stone-750'}">{item}</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</div>